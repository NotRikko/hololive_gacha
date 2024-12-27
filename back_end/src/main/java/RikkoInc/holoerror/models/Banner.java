package RikkoInc.holoerror.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "banners")
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public String title;
    public String image;

    @ManyToOne
    @JoinColumn(name = "featured_unit_id")
    private Unit featured_unit;
    
    @ManyToMany
    @JoinTable(
        name = "banner_rate_up_units",
        joinColumns = @JoinColumn(name = "banner_id"),
        inverseJoinColumns = @JoinColumn(name = "unit_id")
    )
    private List<Unit> rate_up_units;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImg(String img) {
        this.image = img;
    }
    public Unit getFeaturedUnit() {
        return featured_unit;
    }

    public void setFeaturedUnit(Unit featuredUnit) {
        this.featured_unit = featuredUnit;
    }

    public List<Unit> getRateUpUnits() {
        return rate_up_units;
    }

    public void setRateUpUnits(List<Unit> rateUpUnits) {
        this.rate_up_units = rateUpUnits;
    }
}