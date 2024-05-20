package gbsw.capstone4.controller;

import gbsw.capstone4.model.BookListDto;
import gbsw.capstone4.model.BookReportDto;
import gbsw.capstone4.model.ModifyDto;
import gbsw.capstone4.model.Sucessdto;
import gbsw.capstone4.service.BookReportService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
public class BookReportController {

    private final BookReportService bookReportService;

    public BookReportController(BookReportService bookReportService) {
        this.bookReportService = bookReportService;
    }

    @PostMapping("/bookreport")
    public Sucessdto bookReport(@RequestBody BookReportDto dto) {
        return bookReportService.createBoookReport(dto);
    }
    @PostMapping("/bookreport/delete")
    public Sucessdto deleteBookReport(@RequestBody ModifyDto dto) {
        return bookReportService.deleteBookReport(dto);
    }

    @PostMapping("/bookreport/update")
    public Sucessdto updateBookReport(@RequestBody BookReportDto dto) {
        return bookReportService.updateBookReport(dto);
    }

    @GetMapping("/bookreport/{no}")
    public BookReportDto bookReport(@PathVariable("no") String no) {
        return bookReportService.getBookReport(no);
    }

    @GetMapping("/booklist")
    public Page<BookListDto> bookList(Pageable pageable) {
        return bookReportService.getBookList(pageable);
    }
}
