package com.pranav.fullstack_backend.auth.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * Service class for the JWT(Json Web Token),<br>
 * Helper methods are defined here.
 * @author ferio
 */
@Service
public class JwtService {
    private static final String SECRET_KEY = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";

    /**
     * Method to extract username(email) from the token using method
     * <b>extractClaim</b>.
     * @param token
     * @return Username of type String
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Generic Method to return the specified information required from the token.<br>
     * The first parameter is the token itself and the second is the getter method for that
     * required parameter. So, In this method we first extract all the claims from the token <br>
     * and then we pass those claims to the getter method resulting in the returned <br>
     * information for that parameter.
     * @param token
     * @param claimsResolver Getter method for different parameters.
     * @return Specified information from the token
     * @param <T>
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * This method is used to generate the token using the {@link UserDetails}.<br>
     * Here we are again calling an overloaded method.
     * @param userDetails
     * @return JWT TOKEN
     */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /**
     * This is the actual method used to generate token. Here we are <br>
     * setting claims, subject, issued date, expiration date and signing with<br>
     * the signIn Key.
     * @param extraClaims
     * @param userDetails
     * @return
     */
    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * This is the method for Token validation. Here we have the token and <br>
     * the userDetails (This userDetails contains the information for that user <br>
     * having the username extracted using the token). If the username from the token <br>
     * is same as username in the userDetails and the token is not expired yet then this method <br>
     * will return true or false.
     * @param token
     * @param userDetails
     * @return Boolean value(True if token valid and false if not)
     */
    public Boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        boolean flag1 = username.equals(userDetails.getUsername());
        boolean flag2 = !isTokenExpired(token);
        return flag1 && flag2;
    }

    /**
     * Return boolean value (True if the current time is after the <br>
     * expiration time and false if it isn't).
     * @param token
     * @return True/False
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * This method is used to extract the expiration time for <br> the token
     * using the token.
     * @param token
     * @return Date of expiration
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * This method is used to extract all the claims from the token.
     * @param token
     * @return {@link Claims}
     */
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * This method returns the key using the SECRET_KEY.
     * @return {@link Key}
     */
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

