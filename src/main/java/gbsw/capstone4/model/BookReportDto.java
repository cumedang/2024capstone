package gbsw.capstone4.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@ToString
@Getter
@Setter
@Entity
@Table(name = "bookreport")
public class BookReportDto {
    @Id
    @Column(name = "id")
    private String  no;


    @Column(name = "bookid")
    private String bookId;

    @Column(name = "userid")
    private String writer;

    @Column
    private int likes;

    @Column
    private String description;


    @Column
    private String reviews;


    @Column
    private String paragraph;



    // 생성자, getter 및 setter 등...
}




