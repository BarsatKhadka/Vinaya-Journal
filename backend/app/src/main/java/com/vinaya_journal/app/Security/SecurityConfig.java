package com.vinaya_journal.app.Security;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource) throws Exception {

        //Csrf configurations (Ignoring csrf in public api's)
        http.csrf(csrf -> csrf
//                .disable());
                .ignoringRequestMatchers("" ));

        //http session management stateless + giving permit all to public requests.
        http.sessionManagement(Management -> Management.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))

                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("*" ).permitAll()
                        .anyRequest().authenticated())
//                .formLogin(Customizer.withDefaults()

//                .addFilterBefore(jwtFilter , UsernamePasswordAuthenticationFilter.class)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()));


        //enabling this makes you require to pass authorization header with base64 code
        http.httpBasic(withDefaults());

        //return this by building it.
        return http.build();

    }

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
