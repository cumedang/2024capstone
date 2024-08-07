package gbsw.capstone4.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "chat")
public class ChatDto {
    @Id
    private int id;

    @Column(name = "userid")
    private String user;

    private String text;

    private int chatid;


}
