package gbsw.capstone4.service;

import gbsw.capstone4.model.ChatDto;
import gbsw.capstone4.model.ChatListDto;
import gbsw.capstone4.repository.ChatListRepository;
import gbsw.capstone4.repository.ChatRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ChatService {

    private final ChatRepository chatRepository;

    private final ChatListRepository chatListRepository;

    public ChatService(ChatRepository chatRepository, ChatListRepository chatListRepository) {
        this.chatRepository = chatRepository;
        this.chatListRepository = chatListRepository;
    }

    public List<ChatDto> selectChatTextService(int chatid) {
        return chatRepository.findAllByChatid(chatid);
    }

    public List<ChatListDto> ChatList() {
        return chatListRepository.findAll();
    }
}
