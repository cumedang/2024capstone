package gbsw.capstone4.service;

import gbsw.capstone4.model.*;
import gbsw.capstone4.repository.BookListRepository;
import gbsw.capstone4.repository.BookReportRepository;
import gbsw.capstone4.repository.SignReposirtory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MemberService {



    private final SignReposirtory signReposirtory;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public MemberService(SignReposirtory signReposirtory, BookReportRepository bookReportRepository, BookListRepository bookListRepository) {

        this.signReposirtory = signReposirtory;
    }



    public Sucessdto loginService(HttpServletResponse response, SignDto signdto) {
        Sucessdto suceessdto = new Sucessdto();
        suceessdto.setSuccess(false);
        System.out.println(signdto.getId());
        if(!findByid(signdto.getId())) {
            Optional<SignDto> pw = signReposirtory.findById(signdto.getId());
            if(BCrypt.checkpw(signdto.getPassword(),String.valueOf(pw.get().getPassword()) )) {
                Cookie cookie = new Cookie("userid", signdto.getId());
                cookie.setMaxAge(-1);
                response.addCookie(cookie);
                suceessdto.setSuccess(true);
                return suceessdto;
            }
        }
        return suceessdto;
    }
    public Sucessdto signService(SignDto signdto) {
        Sucessdto suceessdto = new Sucessdto();
        suceessdto.setSuccess(false);
        if(findByid(signdto.getId())) {
            if(findByName(signdto.getName())) {
                String hashedPassword = BCrypt.hashpw(signdto.getPassword(), BCrypt.gensalt());
                signdto.setPassword(hashedPassword);
                SignDto saveDto = signReposirtory.save(signdto);
                if(saveDto != null) {
                    suceessdto.setSuccess(true);
                    entityManager.createNativeQuery("CREATE TABLE " + signdto.getId() + " (id INT AUTO_INCREMENT PRIMARY KEY, likename VARCHAR(255), likebook VARCHAR(255))").executeUpdate();
                    return suceessdto;
                }else {
                    return suceessdto;
                }

            }
        }else {
            return suceessdto;
        }
        return suceessdto;
    }




    public boolean findByid(String id) {
        Optional<SignDto> signdto = signReposirtory.findById(id);
        if(signdto.isEmpty()) {
            return true;
        }
        return false;
    }
    public boolean findByName(String name) {
        Optional<SignDto> signdto = signReposirtory.findByName(name);
        if(signdto.isEmpty()) {
            return true;
        }
        return false;
    }

}
