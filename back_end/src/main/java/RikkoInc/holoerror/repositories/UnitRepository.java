package RikkoInc.holoerror.repositories;

import RikkoInc.holoerror.models.Unit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UnitRepository extends JpaRepository<Unit,Long> {

    Unit findByName(String name);
    List<Unit> findByRarity(String rarity);
}
