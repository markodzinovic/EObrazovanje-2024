package com.ftn.sluzba.entity;

import com.ftn.sluzba.enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "User")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "userName")
	private String userName;

	@Column(name = "password")
	private String password;

	@Column(name = "role")
	private Role role;

	@Column(name = "active")
	private boolean active = true;

	public User() {
	}

	public User(Long id, String userName, String password, Role role, boolean active) {
		this.id = id;
		this.userName = userName;
		this.password = password;
		this.role = role;
		this.active = active;
	}

	public User(String userName, String password, Role role, boolean active) {
		this.userName = userName;
		this.password = password;
		this.role = role;
		this.active = active;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
}
