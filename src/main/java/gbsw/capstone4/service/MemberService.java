package gbsw.capstone4.service;

import gbsw.capstone4.model.LoginDto;
import gbsw.capstone4.model.SIgnDto;
import gbsw.capstone4.repository.LoginRepository;
import gbsw.capstone4.repository.SignReposirtory;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
@Transactional
public class MemberService {
    public static String hashPassword(String password) {
        try {
            // SHA 알고리즘을 사용하여 MessageDigest 객체를 생성합니다.
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            // 비밀번호 문자열을 바이트 배열로 변환하여 해시화합니다.
            byte[] hashedBytes = digest.digest(password.getBytes());

            // 바이트 배열을 16진수 문자열로 변환합니다.
            StringBuilder stringBuilder = new StringBuilder();
            for (byte b : hashedBytes) {
                stringBuilder.append(String.format("%02x", b));
            }
            return stringBuilder.toString();
        } catch (NoSuchAlgorithmException e) {
            // NoSuchAlgorithmException이 발생할 경우 처리할 예외 로직을 추가하세요.
            e.printStackTrace();
            return null;
        }
    }


    private final LoginRepository loginRepository;
    private final SignReposirtory signReposirtory;

    @Autowired
    public MemberService(LoginRepository loginRepository, SignReposirtory signReposirtory) {
        this.loginRepository = loginRepository;
        this.signReposirtory = signReposirtory;
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
            if(findByPaswword(id).equals(hashPassword(loginDto.getPassword()))) {
                return "Sucess";
            }else {
                return "False";
            }
        }else {
            return "False";
        }

    }
    public String SignService(SIgnDto dto) {
        try {
            String password = dto.getPassword();
            String hashedPassword = hashPassword(password);
            dto.setPassword(hashedPassword);
            signReposirtory.save(dto);
            return "Success";
        } catch (Exception e) {
            e.printStackTrace();
            return "ERROR";
        }
    }

}
