package com.ftn.sluzba.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ftn.sluzba.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	public User findByUserName(String username);
}
