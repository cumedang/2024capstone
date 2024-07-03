package gbsw.capstone4.repository;

import gbsw.capstone4.model.BuyListDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuyListRepository extends JpaRepository<BuyListDto,Integer> {

}
