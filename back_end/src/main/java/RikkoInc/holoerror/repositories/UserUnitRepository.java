package RikkoInc.holoerror.repositories;


import RikkoInc.holoerror.models.UserUnit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserUnitRepository extends JpaRepository<UserUnit, Long> {

    List<UserUnit> findByUserId(Long user_id);

}

