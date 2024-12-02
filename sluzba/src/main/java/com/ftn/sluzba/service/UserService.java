package com.ftn.sluzba.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ftn.sluzba.dto.AddTeacherDTO;
import com.ftn.sluzba.dto.RegisterDTO;
import com.ftn.sluzba.entity.User;
import com.ftn.sluzba.enums.Role;
import com.ftn.sluzba.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder bCryptPasswordEncoder;

	public User findByUsername(String username) {
		return userRepository.findByUserName(username);
	}

	public User saveUser(RegisterDTO registerDTO) {
		User newUser = new User(registerDTO.username, bCryptPasswordEncoder.encode(registerDTO.password),
				Role.ROLE_ADMIN, false);
		return userRepository.save(newUser);
	}
	
	public User saveUser(AddTeacherDTO addTeacherDTO) {
		User newUser = new User(addTeacherDTO.userName, bCryptPasswordEncoder.encode(addTeacherDTO.password),
				addTeacherDTO.role, true);
		return userRepository.save(newUser);
	}

}
