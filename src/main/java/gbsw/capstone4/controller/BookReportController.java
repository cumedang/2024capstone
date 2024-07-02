package gbsw.capstone4.controller;

import gbsw.capstone4.model.BookListDto;
import gbsw.capstone4.model.BookReportDto;
import gbsw.capstone4.model.ModifyDto;
import gbsw.capstone4.model.Successdto;
import gbsw.capstone4.service.BookReportService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
@RestController
public class BookReportController {

    private final BookReportService bookReportService;

    public BookReportController(BookReportService bookReportService) {
        this.bookReportService = bookReportService;
    }

    @PostMapping("/bookreport")
    public Successdto bookReport(@RequestBody BookReportDto dto) {
        return bookReportService.createBoookReport(dto);
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

}
