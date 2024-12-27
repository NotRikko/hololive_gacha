package RikkoInc.holoerror.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import RikkoInc.holoerror.DTO.AddUnitsRequest;
import RikkoInc.holoerror.models.User;
import RikkoInc.holoerror.models.UserUnit;
import RikkoInc.holoerror.services.UserService;



@RestController
@CrossOrigin(origins = "http://localhost:5173") 
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public ResponseEntity<User> getUser(@RequestParam String username) {
        User user = userService.getUserByUsername(username); 
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
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
}

    /* 
    @PostMapping("/user/addUnits")
    public String postMethodName(@RequestParam String username) {
        User user = userService.getUserByUsername(username);

        
        return entity;
    }
    */
    

    /* 
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestParam String username, 
                                         @RequestParam String password, 
                                         @RequestParam String email) {
        userService.createUser(username, password, email);
        return ResponseEntity.ok("User created");
    }
    */


    // Other endpoints for login, etc.
