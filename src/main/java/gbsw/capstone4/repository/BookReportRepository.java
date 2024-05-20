package gbsw.capstone4.repository;

import gbsw.capstone4.model.BookReportDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookReportRepository extends JpaRepository<BookReportDto,String> {
    void deleteByNo(String no);

    Optional<BookReportDto> findByNo(String no);
}
