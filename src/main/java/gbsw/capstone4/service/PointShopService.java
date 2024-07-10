package gbsw.capstone4.service;

import gbsw.capstone4.jwt.JwtTokenProvider;
import gbsw.capstone4.model.BuyListDto;
import gbsw.capstone4.model.PointShopdto;
import gbsw.capstone4.model.SignDto;
import gbsw.capstone4.model.Successdto;
import gbsw.capstone4.repository.BuyListRepository;
import gbsw.capstone4.repository.PointShopRepository;
import gbsw.capstone4.repository.SignReposirtory;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class PointShopService {
    private final PointShopRepository pointShopRepository;
    private final SignReposirtory signReposirtory;

    private final JwtTokenProvider jwtTokenProvider;

    private final BuyListRepository buyListRepository;

    public PointShopService(PointShopRepository pointShopRepository, SignReposirtory signReposirtory, JwtTokenProvider jwtTokenProvider, BuyListRepository buyListRepository) {
        this.pointShopRepository = pointShopRepository;
        this.signReposirtory = signReposirtory;
        this.jwtTokenProvider = jwtTokenProvider;
        this.buyListRepository = buyListRepository;
    }

    public List<PointShopdto> getPointListService(String category) {
        return pointShopRepository.findAllByCategory(category);
    }

    public List<PointShopdto> selectPointListService(String name) {
        return pointShopRepository.findAllByNameContains(name);
    }

    public List<BuyListDto> buuLisyService(String token) {
        String tokenValue = token.substring(7);
        String userid = jwtTokenProvider.getUsername(tokenValue);
        return buyListRepository.findAllByUserid(userid);
    }

    public Successdto buyPointShopService(String token,int id) {
        Successdto successdto = new Successdto();
        BuyListDto buyListDto = new BuyListDto();
        successdto.setSuccess(false);
        String tokenValue = token.substring(7);
        String userid = jwtTokenProvider.getUsername(tokenValue);
        System.out.println(signReposirtory.findPointById(userid));
        Integer userpoint = signReposirtory.findPointById(userid);
        Integer itemprice = pointShopRepository.findPriceById(id);
        String category = pointShopRepository.findCategoryById(id);
        String nameById = pointShopRepository.findNameById(id);
        LocalDateTime now = LocalDateTime.now();

        // LocalDateTime을 Date로 변환
        Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
        if(userpoint - itemprice < 0) {
            return successdto;
        }else {
            SignDto signDto = signReposirtory.findById(userid).get();
            signDto.setPoint(userpoint-itemprice);
            signReposirtory.save(signDto);
            buyListDto.setItemname(nameById);
            buyListDto.setUserid(userid);
            buyListDto.setPrice(itemprice);
            buyListDto.setBuydate(date);
            buyListDto.setCategory(category);
            buyListRepository.save(buyListDto);
            successdto.setSuccess(true);
            return successdto;
        }
    }
}
