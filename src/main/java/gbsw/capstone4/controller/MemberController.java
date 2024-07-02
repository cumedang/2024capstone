package gbsw.capstone4.controller;

import gbsw.capstone4.jwt.JwtTokenProvider;
import gbsw.capstone4.model.*;
import gbsw.capstone4.service.MemberService;
import gbsw.capstone4.service.MyUserDetailsService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class MemberController {

    private final MemberService memberService;

    private final JwtTokenProvider jwtTokenProvider;
    private final MyUserDetailsService userDetailsService;

    @Autowired
    public MemberController(MemberService memberService, JwtTokenProvider jwtTokenProvider, MyUserDetailsService userDetailsService) {
        this.memberService = memberService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> loginProcess(@RequestBody LoginDto dto) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(dto.getId());
        Successdto suceessdto = new Successdto();
        suceessdto.setSuccess(false);
        String accessToken = jwtTokenProvider.createToken(dto.getId(), userDetails.getAuthorities().toString());
        String refreshToken = jwtTokenProvider.createRefreshToken(dto.getId());
        TokenDto tokenDto = new TokenDto();
        tokenDto.setAccessToken(accessToken);
        tokenDto.setRefreshToken(refreshToken);
        if(memberService.loginService(dto).getSuccess().equals(true)) {
            if(ResponseEntity.ok().equals("")) {
                suceessdto.setSuccess(false);
            }else {
                suceessdto.setSuccess(true);
            }
        }
        tokenDto.setSuccessdto(suceessdto);


        return ResponseEntity.ok().body(tokenDto);
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenDto> refreshToken(@RequestHeader("newAccessToken") String refreshToken) {
        Successdto successdto = new Successdto();
        successdto.setSuccess(false);
        TokenDto tokenDto = new TokenDto();
        if (jwtTokenProvider.validateRefreshToken(refreshToken)) {
            String userId = jwtTokenProvider.getRefresshUsername(refreshToken);
            UserDetails userDetails = userDetailsService.loadUserByUsername(userId);
            String newAccessToken = jwtTokenProvider.createToken(userId, userDetails.getAuthorities().toString());
            tokenDto.setAccessToken(newAccessToken);;
            tokenDto.setRefreshToken(refreshToken);;
            successdto.setSuccess(true);
        }
        tokenDto.setSuccessdto(successdto);
        return ResponseEntity.ok().body(tokenDto);
    }

    @PostMapping("/sign")
    public Successdto signProcess(@RequestBody SignDto dto) {
        return memberService.signService(dto);
    }

    @GetMapping("/profile")
    public Optional<SignDto> ProfileProcess(@RequestHeader("Authorization") String token) {
        String tokenValue = token.substring(7);
        String id = jwtTokenProvider.getUsername(tokenValue);
        return memberService.ProFileService(id);
    }




}
