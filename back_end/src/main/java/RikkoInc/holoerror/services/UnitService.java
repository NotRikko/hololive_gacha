package RikkoInc.holoerror.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import RikkoInc.holoerror.repositories.UnitRepository;
import RikkoInc.holoerror.models.Unit;

@Service
public class UnitService {
    
    @Autowired
    private UnitRepository unitRepository;

    public Unit getUnit(String name) {
        return unitRepository.findByName(name);
    }

    public Optional<Unit> getUnitById(Long id) {
        return unitRepository.findById(id);
    }

    public List<Unit> getUnitsByIds(List<Long> ids) {
        return unitRepository.findAllById(ids);
    }

    public List<Unit> getAllUnits() {
        return unitRepository.findAll();
    }

    public List<Unit> getUnitsByRarity(String rarity) {
        return unitRepository.findByRarity(rarity);
    }

}
