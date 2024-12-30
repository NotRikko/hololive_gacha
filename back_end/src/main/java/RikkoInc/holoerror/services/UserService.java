package RikkoInc.holoerror.services;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; 
import org.springframework.stereotype.Service;
import RikkoInc.holoerror.repositories.UserRepository;
import RikkoInc.holoerror.repositories.UserUnitRepository;
import jakarta.transaction.Transactional;
import RikkoInc.holoerror.DTO.AddUnitsRequest;
import RikkoInc.holoerror.DTO.LoginUserRequest;
import RikkoInc.holoerror.models.User;
import RikkoInc.holoerror.models.UserUnit;
import RikkoInc.holoerror.models.Unit;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired 
    private UserUnitRepository userUnitRepository;

    @Autowired
    private UnitService unitService; 
    

    /*@Autowired
    private RefreshTokenRepository refreshTokenRepository;
    */

    /* 
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    */

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);  
    }

    public User getUserById(Long user_id) {
        return userRepository.findById(user_id).orElse(null);
    }
    
    public List<UserUnit> getUserUnits(Long user_id) {
        return userUnitRepository.findByUserId(user_id);
    }

    @Transactional
    public String addUnits(AddUnitsRequest request) {
        // Fetch the user
        User user = userRepository.findByUsername(request.getUsername());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        user.setGems(user.getGems()-10); 

        // Fetch the pulled units
        List<Unit> pulledUnits = unitService.getUnitsByIds(request.getGachaPulls());

        // Get current UserUnit list
        List<UserUnit> currentUserUnits = userUnitRepository.findByUserId(user.getId());

        // Create a set of unit_ids that the user already owns
        Set<Long> existingUnitIds = currentUserUnits.stream()
            .map(userUnit -> userUnit.getUnit().getId())
            .collect(Collectors.toSet());

        for (Unit pulledUnit : pulledUnits) {
            // If the user already owns this unit (i.e., the user_unit already exists), skip it
            if (existingUnitIds.contains(pulledUnit.getId())) {
                continue;
            }

            UserUnit newUserUnit = new UserUnit();
            newUserUnit.setUser(user);
            newUserUnit.setUnit(pulledUnit);
            newUserUnit.setLevel(1);

            // Save the new UserUnit entity
            userUnitRepository.save(newUserUnit);
        }

        return "Units added successfully";
    }

    @Transactional
    public User loginUser(LoginUserRequest request) {
        User user = userRepository.findByUsername(request.getUsername());
        if (user == null) {
            throw new BadCredentialsException("User not found");
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Incorrect password");
        }

        return user;
    }

    @Transactional
    public User createUser(String username, String password) {
        if (userRepository.findByUsername(username) != null) {
            throw new RuntimeException("Username already in use");
        }
        
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(hashedPassword);
        newUser.setImage("https://cdn.donmai.us/original/17/71/177179702fa643f0ba8d8c401f5f2a48.jpg");
        newUser.setLevel(1);
        newUser.setGems(1000);
        newUser.setGold(10000);
        newUser.setStamina(50);

        return userRepository.save(newUser);
    }
    
}