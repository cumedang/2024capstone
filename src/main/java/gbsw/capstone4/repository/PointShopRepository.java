package gbsw.capstone4.repository;

import gbsw.capstone4.model.PointShopdto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PointShopRepository extends JpaRepository<PointShopdto, Integer> {
    List<PointShopdto> findAllByCategory(String category);

    @Query("SELECT s.price FROM PointShopdto s WHERE s.id = :id")
    Integer findPriceById(@Param("id") int id);

    @Query("SELECT s.name FROM PointShopdto s WHERE s.id = :id")
    String findNameById(@Param("id") int id);
    @Query("SELECT s.category FROM PointShopdto s WHERE s.id = :id")
    String findCategoryById(@Param("id") int id);

    List<PointShopdto> findAllByNameContains(String name);
}
