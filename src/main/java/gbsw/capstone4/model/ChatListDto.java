package gbsw.capstone4.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "chatlist")
public class ChatListDto {
    @Id
    private int id;

    private String bookname;
}
