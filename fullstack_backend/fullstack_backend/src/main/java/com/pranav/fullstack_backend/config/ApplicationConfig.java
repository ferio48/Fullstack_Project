package com.pranav.fullstack_backend.config;

import com.pranav.fullstack_backend.dao.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Configuration class for the application <b>(Authentication related)</b>.
 * @author ferio
 */
@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
    private final EmployeeRepository repository;

    /**
     * In this method we are implementing our own method for the {@link UserDetailsService}.<br>
     * So, we are treating as the username and because of this we are passing email as<br>
     * the username in the {@link UserDetailsService}.
     * @return {@link UserDetailsService}
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> repository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username Not Found!!!"));
    }


    /**
     * Custom implementation for the {@link AuthenticationProvider} class.<br>
     * Here we are giving our {@link DaoAuthenticationProvider} which helps in <br>
     * retrieving user details from the {@link UserDetailsService} and the {@link DaoAuthenticationProvider}<br>
     * also takes {@link PasswordEncoder}.
     * @return {@link AuthenticationProvider}
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * This is the custom implementation for the {@link AuthenticationManager} which <br>
     * basically manages the authentication request.
     * @param config
     * @return {@link AuthenticationManager}
     * @throws Exception
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * This is the custom implementation for the {@link PasswordEncoder} interface<br>
     * @return {@link BCryptPasswordEncoder}
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

