package gbsw.capstone4.repository;

import gbsw.capstone4.model.BookListDto;
import gbsw.capstone4.model.BookReportDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookListRepository extends JpaRepository<BookReportDto, String> {
    Page<BookListDto> findAllBy(Pageable pageable);

    Page<BookListDto> findAllByWriter(String userid,Pageable pageable);

    @Query("SELECT s.bookId FROM BookReportDto s WHERE s.writer = :id")
    List<String> findAllBynoPageWriter(@Param("id") String userid);
}
