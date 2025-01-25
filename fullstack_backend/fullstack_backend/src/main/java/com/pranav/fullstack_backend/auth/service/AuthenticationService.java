package com.pranav.fullstack_backend.auth.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.http.javanet.NetHttpTransport;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pranav.fullstack_backend.auth.AuthenticationRequest;
import com.pranav.fullstack_backend.auth.AuthenticationResponse;
import com.pranav.fullstack_backend.auth.GoogleSSORequest;
import com.pranav.fullstack_backend.auth.RegisterRequest;
import com.pranav.fullstack_backend.model.Employee;
import com.pranav.fullstack_backend.dao.EmployeeRepository;
import com.pranav.fullstack_backend.model.Token;
import com.pranav.fullstack_backend.dao.TokenRepository;
import com.pranav.fullstack_backend.enums.TokenType;
import io.jsonwebtoken.io.Decoders;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Base64;

/**
 * Here we are registering and authenticating the user <br>
 * @author ferio
 */

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final EmployeeRepository repository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService service;
    private final AuthenticationManager authenticationManager;

    /**
     * Here we are getting the {@link RegisterRequest}. So, in the <br>
     * registering request we are getting the initial information about the user.<br>
     * We are saving these initial information in the database.
     * @param request
     * @return {@link AuthenticationResponse}
     */
    public AuthenticationResponse register(RegisterRequest request) {
        var employee = Employee.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .dob(request.getDob())
                .company(request.getCompany())
                .experience(request.getExperience())
                .expertise(request.getExpertise())
                .gender(request.getGender())
                .role(request.getRole())
                .build();
        var savedEmployee = repository.save(employee);
        var jwtToken = service.generateToken(employee);
        saveEmployeeToken(savedEmployee, jwtToken);
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }

    private void revokeAllEmployeeTokens(Employee employee) {
        var validEmployeeTokens = tokenRepository.findAllValidTokensByEmployee(employee.getId());

        if(validEmployeeTokens.isEmpty()) return;

        validEmployeeTokens.forEach(t -> {
            t.setRevoked(true);
            t.setExpired(true);
        });

        tokenRepository.saveAll(validEmployeeTokens);
    }

    /**
     * This is the method for authenticating the registered user. <br>
     * Here we are using the {@link AuthenticationManager} for the authentication <br>
     * process.
     * @param request
     * @return {@link AuthenticationResponse}
     */
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var employee = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Username NOT FOUND!!!"));
        var jwtToken = service.generateToken(employee);
        revokeAllEmployeeTokens(employee);
        saveEmployeeToken(employee, jwtToken);
        return AuthenticationResponse
                .builder()
                .email(request.getEmail())
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse googleSSOAuthenticate(GoogleSSORequest request) throws GeneralSecurityException, IOException {

        String jwtToken = "";
        String googleIdToken = request.getToken();

        HttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .build();

        // Verify the ID token
        GoogleIdToken idToken = verifier.verify(googleIdToken);

        if (idToken != null) {
            System.out.println("It is verified");
            GoogleIdToken.Payload payload = idToken.getPayload();

            // Get user information from the payload
            String userId = payload.getSubject();
            String email = payload.getEmail();
            String name = (String) payload.get("name");


//            String decodeToken = decodeBase64Token(request.getToken());
//            ObjectMapper objectMapper = new ObjectMapper();
//            String email = "";
//            try {
//                JsonNode jsonNode = objectMapper.readTree(decodeToken);
//                // Extract the email field from the JSON
//                if (jsonNode.has("email")) {
//                    email = jsonNode.get("email").asText();
//                }
//            } catch (Exception e) {
//                e.printStackTrace();
//                // Handle parsing errors
//            }

            var employee = repository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Username NOT FOUND!!!"));
            jwtToken = service.generateToken(employee);
            revokeAllEmployeeTokens(employee);
            saveEmployeeToken(employee, jwtToken);
            return AuthenticationResponse
                    .builder()
                    .email(email)
                    .token(jwtToken)
                    .build();
        }

        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }

    public static String decodeBase64Token(String base64Token) {
        byte[] decodedBytes = Base64.getDecoder().decode(base64Token);
        return new String(decodedBytes);
    }

    private void saveEmployeeToken(Employee savedEmployee, String jwtToken) {
        var token = Token.builder()
                .employee(savedEmployee)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }
}
