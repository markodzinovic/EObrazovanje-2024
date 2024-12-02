package com.ftn.sluzba.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.sluzba.dto.LoginDTO;
import com.ftn.sluzba.dto.RegisterDTO;
import com.ftn.sluzba.security.TokenUtils;
import com.ftn.sluzba.service.UserDetailsServiceImpl;
import com.ftn.sluzba.service.UserService;

@RestController
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;

	@Autowired
	private UserService userService;

	@Autowired
	TokenUtils tokenUtils;

	@GetMapping("/api/test")
	public ResponseEntity<String> checkHealth() {
		try {
			return new ResponseEntity<String>("Api is available.", HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<String>("Something went wrong.", HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/api/login")
	public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
		try {
			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginDTO.username,
					loginDTO.password);
			authenticationManager.authenticate(token);
			UserDetails details = userDetailsServiceImpl.loadUserByUsername(loginDTO.username);

			return new ResponseEntity<String>(tokenUtils.generateToken(details), HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<String>(ex.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/api/register")
	public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO) {
		try {
			userService.saveUser(registerDTO);
			return new ResponseEntity<RegisterDTO>(registerDTO, HttpStatus.OK);
		} catch (Exception ex) {
			System.out.print(ex.getMessage());
			return new ResponseEntity<String>("Invalid register", HttpStatus.BAD_REQUEST);
		}
	}

}
