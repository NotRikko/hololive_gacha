package RikkoInc.holoerror.DTO;

public class LoginUserResponse {
    private String userID;
    private String token;

    public LoginUserResponse() {}

    public LoginUserResponse(String userID, String token) {
        this.userID = userID;
        this.token = token;
    }

    // Getters and Setters
    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
