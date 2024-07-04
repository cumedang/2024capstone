package gbsw.capstone4.repository;

import gbsw.capstone4.model.BuyListDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyListRepository extends JpaRepository<BuyListDto,Integer> {
}
