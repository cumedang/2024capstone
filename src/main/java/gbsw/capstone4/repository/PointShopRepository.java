package gbsw.capstone4.repository;

import gbsw.capstone4.model.PointShopdto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointShopRepository extends JpaRepository<PointShopdto, Integer> {

}
