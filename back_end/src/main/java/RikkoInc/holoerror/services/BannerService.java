package RikkoInc.holoerror.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import RikkoInc.holoerror.repositories.BannerRepository;
import RikkoInc.holoerror.models.Banner;

@Service
public class BannerService {
    
    @Autowired
    private BannerRepository bannerRepository;

    public Banner getBanner(String title) {
        return bannerRepository.findByTitle(title);
    }

    public List<Banner> getAllBanners() {
        return bannerRepository.findAll();
    }

}
