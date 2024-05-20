package gbsw.capstone4.repository;


import gbsw.capstone4.model.SignDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SignReposirtory extends JpaRepository<SignDto,String> {
    Optional<SignDto> findById(String userid);
    Optional<SignDto> findByName(String userName);
}
