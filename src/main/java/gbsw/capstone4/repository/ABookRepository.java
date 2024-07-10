package gbsw.capstone4.repository;

import gbsw.capstone4.model.BookDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Book;
import java.util.Optional;

@Repository
public interface ABookRepository extends JpaRepository<BookDto, Long> {
    Optional<BookDto> findByTitle(String title);
}
