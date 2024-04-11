package gbsw.capstone4.repository;

import gbsw.capstone4.model.LoginDto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LoginRepository extends JpaRepository<LoginDto,String> {
    Optional<LoginDto> findById(String userid);
}
