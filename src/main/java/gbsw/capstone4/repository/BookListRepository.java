package gbsw.capstone4.repository;

import gbsw.capstone4.model.BookListDto;
import gbsw.capstone4.model.BookReportDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookListRepository extends JpaRepository<BookReportDto, String> {
    Page<BookListDto> findAllBy(Pageable pageable);
}
