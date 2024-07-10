package gbsw.capstone4.repository;

import gbsw.capstone4.model.ChatListDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatListRepository extends JpaRepository<ChatListDto,Long> {
}
