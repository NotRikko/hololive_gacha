package RikkoInc.holoerror.repositories;

import RikkoInc.holoerror.models.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BannerRepository extends JpaRepository<Banner, Long> {

    Banner findByTitle(String title);

}
