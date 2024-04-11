package gbsw.capstone4.repository;


import gbsw.capstone4.model.SIgnDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignReporitory extends JpaRepository<SIgnDto,String> {

}
