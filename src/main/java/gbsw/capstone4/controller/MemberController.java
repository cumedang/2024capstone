package gbsw.capstone4.controller;

import gbsw.capstone4.model.*;
import gbsw.capstone4.service.MemberService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MemberController {
    private  final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService =memberService;
    }

    @PostMapping("/login")
    public Sucessdto loginProcess(HttpServletResponse response, @RequestBody SignDto dto) {
        return memberService.loginService(response,dto);
    }

    @PostMapping("/sign")
    public Sucessdto signProcess(@RequestBody SignDto dto) {
        return memberService.signService(dto);
    }



}
