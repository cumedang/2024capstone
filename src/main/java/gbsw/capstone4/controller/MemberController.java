package gbsw.capstone4.controller;

import gbsw.capstone4.jwt.JwtTokenProvider;
import gbsw.capstone4.model.*;
import gbsw.capstone4.service.MemberService;
import gbsw.capstone4.service.MyUserDetailsService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Successdto> loginProcess(HttpServletResponse response, @RequestBody LoginDto dto) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(dto.getId());
        Successdto suceessdto = new Successdto();
        suceessdto.setSuccess(false);
        String accessToken = jwtTokenProvider.createToken(dto.getId(), userDetails.getAuthorities().toString());
        String refreshToken = jwtTokenProvider.createRefreshToken(dto.getId());
        if(memberService.loginService(dto).getSuccess().equals(true)) {
            Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
            accessTokenCookie.setHttpOnly(true);
            //accessTokenCookie.setSecure(true); // HTTPS에서만 사용
            accessTokenCookie.setPath("/");
            accessTokenCookie.setMaxAge((int) jwtTokenProvider.getAccessExpirationMs() / 1000); // 만료 시간 설정

            Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
            refreshTokenCookie.setHttpOnly(true);
            //refreshTokenCookie.setSecure(true); // HTTPS에서만 사용
            refreshTokenCookie.setPath("/");
            refreshTokenCookie.setMaxAge((int) jwtTokenProvider.getRefreshExpirationMs() / 1000); // 만료 시간 설정

            response.addCookie(accessTokenCookie);
            response.addCookie(refreshTokenCookie);


            if(ResponseEntity.ok().equals("")) {
                suceessdto.setSuccess(false);
            }else {
                suceessdto.setSuccess(true);
            }
        }



        return ResponseEntity.ok().body(suceessdto);
    }

    @PostMapping("/sign")
    public Successdto signProcess(@RequestBody SignDto dto) {
        return memberService.signService(dto);
    }



}
