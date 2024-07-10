package gbsw.capstone4.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenDto {
    private String accessToken;

    private String refreshToken;

    private Successdto successdto;

}
