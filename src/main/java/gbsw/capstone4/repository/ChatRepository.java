package gbsw.capstone4.repository;

import gbsw.capstone4.model.ChatDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<ChatDto,Long> {
    List<ChatDto> findAllByChatid(int chatid);
}
