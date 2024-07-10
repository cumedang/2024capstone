package gbsw.capstone4.controller;

import gbsw.capstone4.model.ChatDto;
import gbsw.capstone4.model.ChatListDto;
import gbsw.capstone4.service.ChatService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }


    @GetMapping("/chat/{id}")
    public List<ChatDto> selectChatText(@PathVariable("id") int chatid) {
        return chatService.selectChatTextService(chatid);
    }

    @GetMapping("/chatlist")
    public List<ChatListDto> chatList() {
        return chatService.ChatList();
    }
}
