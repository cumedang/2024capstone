package gbsw.capstone4.controller;

import gbsw.capstone4.model.EmailCheckDto;
import gbsw.capstone4.model.EmailRequestDto;
import gbsw.capstone4.model.Successdto;
import gbsw.capstone4.service.MailSendService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Check;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequiredArgsConstructor
public class MailController {
    private final MailSendService mailService;

    @PostMapping("/mailsend")
    public String mailSend(@RequestBody @Valid EmailRequestDto emailDto) {
        System.out.println("이메일 인증 이메일 :" + emailDto.getEmail());
        return mailService.joinEmail(emailDto.getEmail());
    }
    @PostMapping("/mailcheck")
    public Successdto AuthCheck(@RequestBody @Valid EmailCheckDto emailCheckDto){
        Boolean Checked=mailService.CheckAuthNum(emailCheckDto.getEmail(),emailCheckDto.getAuthNum());
        Successdto successdto = new Successdto();
        successdto.setSuccess(false);
        if(Checked){
            successdto.setSuccess(true);
            return successdto;
        }
        else{
            return successdto;
        }
    }
}
