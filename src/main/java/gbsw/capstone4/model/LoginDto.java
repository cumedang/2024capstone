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
public class LoginDto {
    @Id
    private String id;

    @Column(name = "password")
    private  String password;
}
