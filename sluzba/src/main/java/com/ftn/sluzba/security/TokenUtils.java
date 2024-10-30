package com.ftn.sluzba.security;

import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class TokenUtils {
	@Value("${jwt.secret}")
	private String secret;

	@Value("18000") // in seconds (5 hours)
	private Long expiration;

	private Key getSigningKey() {
		byte[] keyBytes = Decoders.BASE64.decode(secret);
		if (keyBytes.length < 64) { // Ensure key length for HS512 is at least 64 bytes
			throw new IllegalArgumentException("The decoded key must be at least 64 bytes for HS512.");
		}
		return Keys.hmacShaKeyFor(keyBytes);
	}

	public String getUsernameFromToken(String token) {
		String username;
		try {
			Claims claims = this.getClaimsFromToken(token);
			username = claims.getSubject();
		} catch (Exception e) {
			username = null;
		}
		return username;
	}

	private Claims getClaimsFromToken(String token) {
		Claims claims;
		try {
			claims = Jwts.parserBuilder().setSigningKey(getSigningKey()) // Use the method to get the signing key
					.build().parseClaimsJws(token).getBody();
		} catch (Exception e) {
			claims = null;
		}
		return claims;
	}

	public Date getExpirationDateFromToken(String token) {
		Date expiration;
		try {
			final Claims claims = this.getClaimsFromToken(token);
			expiration = claims.getExpiration();
		} catch (Exception e) {
			expiration = null;
		}
		return expiration;
	}

	private boolean isTokenExpired(String token) {
		final Date expiration = this.getExpirationDateFromToken(token);
		return expiration.before(new Date(System.currentTimeMillis()));
	}

	public boolean validateToken(String token, UserDetails userDetails) {
		final String username = getUsernameFromToken(token);
		return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
	}

	public String generateToken(UserDetails userDetails) {
		// Define claims with user information
		Map<String, Object> claims = new HashMap<>();
		claims.put("sub", userDetails.getUsername());
		claims.put("created", new Date(System.currentTimeMillis()));

		// Collect roles into a list of strings
		List<String> roles = new ArrayList<>();
		for (GrantedAuthority grantedAuthority : userDetails.getAuthorities()) {
			roles.add(grantedAuthority.getAuthority());
		}
		claims.put("roles", roles);

		// Generate JWT with claims and expiration time
		return Jwts.builder().setClaims(claims).setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
				.signWith(getSigningKey(), SignatureAlgorithm.HS512).compact();
	}

}
