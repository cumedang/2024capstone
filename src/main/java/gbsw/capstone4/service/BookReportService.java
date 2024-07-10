package gbsw.capstone4.service;

import gbsw.capstone4.jwt.JwtTokenProvider;
import gbsw.capstone4.model.*;
import gbsw.capstone4.repository.ABookRepository;
import gbsw.capstone4.repository.BookListRepository;
import gbsw.capstone4.repository.BookReportRepository;
import gbsw.capstone4.repository.SignReposirtory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.awt.print.Book;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BookReportService {

    private final BookReportRepository bookReportRepository;

    private final BookListRepository bookListRepository;
    private final SignReposirtory signReposirtory;

    private final JwtTokenProvider jwtTokenProvider;

    private final ABookRepository bookRepository;

    private final WebClient webClient = WebClient.create("https://www.aladin.co.kr/ttb/api");

    public Optional<BookDto> findBookByTitle(String title) {
        return bookRepository.findByTitle(title);
    }

    public BookDto addBook(BookDto book) {
       return bookRepository.save(book);
    }

    public BookDto searchBookInAladinApi(String title) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=[ttbsunlove84211940001]&Query=" + title + "&QueryType=Title&MaxResults=1&Cover=Big&Output=JS&Version=20131101";
        BookApiResponse response = restTemplate.getForObject(url, BookApiResponse.class);

        if (response != null && response.getItem() != null && !response.getItem().isEmpty()) {
            BookApiResponse.Item item = response.getItem().get(0);
            BookDto book = new BookDto();
            book.setTitle(item.getTitle());
            book.setAuthor(item.getAuthor());
            book.setIsbn(item.getIsbn13());
            return book;
        } else {
            // Handle the case where response.getItem() is null or empty
            return null; // or throw an exception, depending on your application logic
        }
    }

    @PersistenceContext
    private EntityManager entityManager;

    public BookReportService(BookReportRepository bookReportRepository, BookListRepository bookListRepository, SignReposirtory signReposirtory, JwtTokenProvider jwtTokenProvider, ABookRepository bookRepository) {
        this.bookReportRepository = bookReportRepository;
        this.bookListRepository = bookListRepository;
        this.signReposirtory = signReposirtory;
        this.jwtTokenProvider = jwtTokenProvider;
        this.bookRepository = bookRepository;
    }

    public Successdto createBoookReport(String token,BookReportDto dto) {
        Successdto suceessdto = new Successdto();
        String tokenValue = token.substring(7);
        String userid = jwtTokenProvider.getUsername(tokenValue);
        Optional<SignDto> byId = signReposirtory.findById(userid);
        byId.get().setPoint(byId.get().getPoint()+100);
        suceessdto.setSuccess(false);
        BookReportDto bookReportDto = bookReportRepository.save(dto);
        if(bookReportDto != null) {
            suceessdto.setSuccess(true);
            signReposirtory.save(byId.get());
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
    public Page<BookListDto> selectGetBookLIst(String userid,Pageable pageable) {
        Page<BookListDto> allByWriter = bookListRepository.findAllByWriter(userid, pageable);
        return allByWriter;
    }

    public Successdto checkeBookreportService(String token,String bookname) {
        System.out.println(bookname);
        String tokenValue = token.substring(7);
        String userid = jwtTokenProvider.getUsername(tokenValue);
        Successdto successdto = new Successdto();
        successdto.setSuccess(false);
        Optional<BookDto> byTitle = bookRepository.findByTitle(bookname);
        System.out.println(byTitle.get());
        Long bookid = byTitle.get().getId();
        Optional<SignDto> byId = signReposirtory.findById(userid);
        String username = byId.get().getName();
        List<String> allBynoPageWriter = bookListRepository.findAllBynoPageWriter(username);
        System.out.println(username);
        for(int i = 0; i < allBynoPageWriter.size(); i++) {
            System.out.println(allBynoPageWriter.get(i));
            if(allBynoPageWriter.get(i).equals(bookid.toString())) {
                successdto.setSuccess(true);
            }
        }
        return successdto;
    }
}
