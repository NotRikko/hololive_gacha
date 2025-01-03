package RikkoInc.holoerror;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EnableJpaRepositories("RikkoInc.holoerror.repositories")  // Specify the repository package
@SpringBootApplication
(exclude = {SecurityAutoConfiguration.class})
public class HoloerrorApplication {

	public static void main(String[] args) {
		SpringApplication.run(HoloerrorApplication.class, args);
		
	}

}
