package gbsw.capstone4.service;

import gbsw.capstone4.model.BookListDto;
import gbsw.capstone4.model.BookReportDto;
import gbsw.capstone4.model.ModifyDto;
import gbsw.capstone4.model.Successdto;
import gbsw.capstone4.repository.BookListRepository;
import gbsw.capstone4.repository.BookReportRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class BookReportService {

    private final BookReportRepository bookReportRepository;

    private final BookListRepository bookListRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public BookReportService(BookReportRepository bookReportRepository, BookListRepository bookListRepository) {
        this.bookReportRepository = bookReportRepository;
        this.bookListRepository = bookListRepository;
    }

    public Successdto createBoookReport(BookReportDto dto) {
        Successdto suceessdto = new Successdto();
        suceessdto.setSuccess(false);
        BookReportDto bookReportDto = bookReportRepository.save(dto);
        if(bookReportDto != null) {
            suceessdto.setSuccess(true);
            return suceessdto;
        }else {
            return suceessdto;
        }

    }

    public Successdto deleteBookReport(ModifyDto dto) {
        Successdto suceessdto = new Successdto();
        suceessdto.setSuccess(false);

        Optional<BookReportDto> bookReportDtoOptional = bookReportRepository.findByNo(dto.getId());
        if (bookReportDtoOptional.isPresent()) {
            BookReportDto bookReportDto = bookReportDtoOptional.get();
            if (bookReportDto.getWriter().equals(dto.getUserId())) {
                bookReportRepository.deleteByNo(dto.getId());
                if (bookReportRepository.findByNo(dto.getId()).isEmpty()) {
                    suceessdto.setSuccess(true);
                    return suceessdto;
                }
            }
        }
        return suceessdto;
    }

    public Successdto updateBookReport(BookReportDto dto) {
        Successdto suceessdto = new Successdto();
        suceessdto.setSuccess(false);
        BookReportDto bookReportDto = entityManager.find(BookReportDto.class,dto.getNo());
        if(bookReportDto != null) {
            if(bookReportDto.getWriter().equals(dto.getWriter())){
                bookReportDto.setDescription(dto.getDescription());
                bookReportDto.setReviews(dto.getReviews());
                bookReportDto.setParagraph(dto.getParagraph());
                entityManager.merge(bookReportDto);
                suceessdto.setSuccess(true);
                return suceessdto;
            }
        }
        return suceessdto;
    }

    public BookReportDto getBookReport(String no) {
        BookReportDto bookReportDto = entityManager.find(BookReportDto.class,no);
        if(bookReportDto == null) {
            bookReportDto.setDescription("글을 찾을수 없습니다");
            return bookReportDto;
        }
        return bookReportDto;
    }

    public Page<BookListDto> getBookList(Pageable pageable) {
        return bookListRepository.findAllBy(pageable);
    }
}
