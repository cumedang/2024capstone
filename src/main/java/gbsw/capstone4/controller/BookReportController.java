package gbsw.capstone4.controller;

import gbsw.capstone4.model.*;
import gbsw.capstone4.service.BookReportService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class BookReportController {

    private final BookReportService bookReportService;

    public BookReportController(BookReportService bookReportService) {
        this.bookReportService = bookReportService;
    }

    @PostMapping("/bookreport")
    public Successdto bookReport(@RequestHeader("Authorization") String token,@RequestBody BookReportDto dto) {
        return bookReportService.createBoookReport(token,dto);
    }
    @PostMapping("/bookreport/delete")
    public Successdto deleteBookReport(@RequestBody ModifyDto dto) {
        System.out.println(dto);
        return bookReportService.deleteBookReport(dto);
    }

    @PostMapping("/bookreport/update")
    public Successdto updateBookReport(@RequestBody BookReportDto dto) {
        return bookReportService.updateBookReport(dto);
    }

    @GetMapping("/bookreport/{no}")
    public BookReportDto bookReport(@PathVariable("no") String no) {
        return bookReportService.getBookReport(no);
    }

    @GetMapping("/reportlist")
    public Page<BookListDto> bookList(Pageable pageable) {
        return bookReportService.getBookList(pageable);
    }

    @GetMapping("/bookreport/select/{userid}")
    public Page<BookListDto> selectBookList(@PathVariable("userid") String userid,Pageable pageable) {
        System.out.println(userid);
        return bookReportService.selectGetBookLIst(userid,pageable);
    }

    @GetMapping("/selectbook/{title}")
    public BookDto getBookByTitle(@PathVariable String title) {
        Optional<BookDto> bookOpt = bookReportService.findBookByTitle(title);

        if (bookOpt.isPresent()) {
            return bookOpt.get();
        } else {
            BookDto book = bookReportService.searchBookInAladinApi(title);
            if (book != null) {
                return bookReportService.addBook(book);
            } else {
                throw new RuntimeException("Book not found");
            }
        }
    }

    @PostMapping("/bookreport/check/{name}")
    public Successdto checkBookreport(@RequestHeader("Authorization") String token,@PathVariable("name") String bookname) {
        return bookReportService.checkeBookreportService(token,bookname);
    }
}
