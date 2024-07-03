package gbsw.capstone4.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@ToString
@Getter
@Setter
@Entity
@Table(name = "buylist")
public class BuyListDto {
    @Id
    private int buyid;

    private String userid;

    private int price;

    private String itemname;

    private Date buydate;

    private String category;
}
