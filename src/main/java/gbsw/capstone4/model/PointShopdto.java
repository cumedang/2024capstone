package gbsw.capstone4.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@Entity(name = "pointshop")
public class PointShopdto {
    @Id
    private int id;

    @Column
    private String name;

    @Column
    private String category;

    @Column
    private int price;
}
