package com.foodies.foodies;

import com.foodies.foodies.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class FoodiesSocialApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodiesSocialApplication.class, args);
	}
}
