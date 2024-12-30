package RikkoInc.holoerror.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import RikkoInc.holoerror.DTO.AddUnitsRequest;
import RikkoInc.holoerror.DTO.LoginUserRequest;
import RikkoInc.holoerror.DTO.SignupUserRequest;
import RikkoInc.holoerror.DTO.LoginUserResponse;
import RikkoInc.holoerror.models.User;
import RikkoInc.holoerror.models.UserUnit;
import RikkoInc.holoerror.services.UserService;
import RikkoInc.holoerror.helpers.JwtTokenHelper;




@RestController
@CrossOrigin(origins = "${CORS_ALLOWED_ORIGIN}") 
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @GetMapping("/user")
    public ResponseEntity<User> getUser(@RequestParam String username) {
        User user = userService.getUserByUsername(username); 
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userID}")
    public ResponseEntity<User> getUserInfo(@PathVariable String userID, @RequestHeader("Authorization") String token) {
        if (!jwtTokenHelper.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        try {
            Long id = Long.parseLong(userID); 
            User user = userService.getUserById(id);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(user);
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Handle invalid ID format
        }
    }

    @GetMapping("/viewUnits")
    public ResponseEntity<List<UserUnit>> getUserUnits(@RequestParam Long user_id) {
        List<UserUnit> userUnits = userService.getUserUnits(user_id);
        return ResponseEntity.ok(userUnits);  // Returns a 200 OK with the list
    }
    

    @PostMapping("/addUnits")
    public String addUnits(@RequestBody AddUnitsRequest request) {
        return userService.addUnits(request);
    }

    
    @PostMapping("/login")
    public ResponseEntity<LoginUserResponse> loginUser(@RequestBody LoginUserRequest request) {
        User user = userService.loginUser(request);
        String token = jwtTokenHelper.generateToken(user.getUsername());
        LoginUserResponse response = new LoginUserResponse(user.getId().toString(), token);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signupUser(@RequestBody SignupUserRequest request) {
        userService.createUser(request.getUsername(), request.getPassword());
        return ResponseEntity.ok("User Created");
    }
}




