package com.vinaya_journal.app.Security;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        return new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration cfg = new CorsConfiguration();

                //allowed origins.
                cfg.setAllowedOrigins(Arrays.asList(
                        "http://localhost:3000",
                        "http://localhost:5173",
                        "http://localhost:5174"
                ));

                //CRUD , which methods to allow cors.
                cfg.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH"));
                cfg.setAllowCredentials(true);

                //which http headers can be used while making request
                cfg.setAllowedHeaders(Arrays.asList("*"));


                //these browsers can access.
                cfg.setExposedHeaders(Arrays.asList("*"));

                cfg.setMaxAge(3600L);

                return cfg;
            }
        };
    }
}
