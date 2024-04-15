package gbsw.capstone4.service;

import gbsw.capstone4.model.LoginDto;
import gbsw.capstone4.model.SIgnDto;
import gbsw.capstone4.repository.LoginRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class MemberService {


    private final LoginRepository loginRepository;

    @Autowired
    public MemberService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }



    public String findById(String id) {
        Optional<LoginDto> loginDto = loginRepository.findById(id);

        return loginDto.get().getId();
    }
    public String findByPaswword(String id) {
        Optional<LoginDto> loginDto = loginRepository.findById(id);
        return loginDto.get().getPassword();
    }

    public String LoginService(LoginDto loginDto) {
        String id = findById(loginDto.getId());
        if(!id.toString().isEmpty()) {
            if(findByPaswword(id).equals(loginDto.getPassword())) {
                return "Sucess";
            }else {
                return "False";
            }
        }else {
            return "False";
        }

    }
    public String SignService(SIgnDto dto) {
        return "";
    }

}
