package RikkoInc.holoerror.DTO;

import java.util.List;

public class AddUnitsRequest {
    private String username;
    private List<Long> gachaPulls; 

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Long> getGachaPulls() {
        return gachaPulls;
    }

    public void setGachaPulls(List<Long> gachaPulls) {
        this.gachaPulls = gachaPulls;
    }
}