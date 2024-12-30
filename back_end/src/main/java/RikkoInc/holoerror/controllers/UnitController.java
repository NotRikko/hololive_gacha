package RikkoInc.holoerror.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import RikkoInc.holoerror.models.Unit;
import RikkoInc.holoerror.services.UnitService;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/units")

public class UnitController {
    @Autowired
    private UnitService unitService;

    @GetMapping("/unit")
    public ResponseEntity<Unit> getUnit(@RequestParam String name) {
        Unit unit = unitService.getUnit(name);
        return ResponseEntity.ok(unit);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Unit>> getAllUnits() {
        List<Unit> units = unitService.getAllUnits();
        return ResponseEntity.ok(units);
    }
    
    @GetMapping("/unitsByIds")
    public ResponseEntity<List<Unit>> getUnitsByIds(@RequestParam List<Long> ids) {
        List<Unit> units = unitService.getUnitsByIds(ids);
        return ResponseEntity.ok(units);
    }

    @GetMapping("/rarity")
    public ResponseEntity<List<Unit>> getUnitsByRarity(@RequestParam String rarity) {
        List<Unit> units = unitService.getUnitsByRarity(rarity);
        return ResponseEntity.ok(units);
    }
}
