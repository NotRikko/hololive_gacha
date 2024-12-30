package RikkoInc.holoerror.repositories;

import RikkoInc.holoerror.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
    
}