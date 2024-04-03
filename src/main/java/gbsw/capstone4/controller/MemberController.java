package gbsw.capstone4.controller;

import gbsw.capstone4.model.LoginDto;
import gbsw.capstone4.model.SIgnDto;
import gbsw.capstone4.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberController {
    private  final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService =memberService;
    }

    @PostMapping("/login")
    public String loginProcess(@RequestBody LoginDto dto) {
        return memberService.LoginService(dto);
    }

    @PostMapping("/sign")
    public String signProvess(@RequestBody SIgnDto dto) {
        return memberService.SignService(dto);
    }


}
