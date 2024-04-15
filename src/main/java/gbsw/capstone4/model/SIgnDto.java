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
@Entity
@Table(name = "member")
public class SIgnDto {
    @Id
    private String id;

    @Column
    private String password;

    @Column
    private String name;

    @Column
    private String email;

}
