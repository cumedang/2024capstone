package gbsw.capstone4.controller;

import gbsw.capstone4.model.PointShopdto;
import gbsw.capstone4.model.Successdto;
import gbsw.capstone4.service.PointShopService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PointShopController {
    private final PointShopService pointShopService;

    public PointShopController(PointShopService pointShopService) {
        this.pointShopService = pointShopService;
    }

    @GetMapping("/pointshop/{category}")
    public List<PointShopdto> getPointList(@PathVariable("category") String category) {
        return pointShopService.getPointListService(category);
    }

    @PostMapping("/pointshop/buy/{id}")
    public Successdto buyPointshop(@RequestHeader("Authorization") String token,@PathVariable("id") int id) {
        return pointShopService.buyPointShopService(token,id);
    }

    @GetMapping("/poinshop/select/{name}")
    public List<PointShopdto> selectPointList(@PathVariable("name") String id) {
        return pointShopService.selectPointListService(id);
    }
}
