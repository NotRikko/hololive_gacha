package RikkoInc.holoerror.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import RikkoInc.holoerror.models.Banner;
import RikkoInc.holoerror.services.BannerService;


@RestController
@CrossOrigin(origins = "http://localhost:5173") 
@RequestMapping("/api/banners")

public class BannerController {
    @Autowired
    private BannerService bannerService;

    @GetMapping("/banner")
    public ResponseEntity<Banner> getBanner(@RequestParam String title) {
        Banner banner = bannerService.getBanner(title);
        return ResponseEntity.ok(banner);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Banner>> getAllBanners() {
        List<Banner> banners = bannerService.getAllBanners();
        return ResponseEntity.ok(banners);
    }

}