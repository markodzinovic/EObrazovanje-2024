package com.ftn.sluzba.dto;

import com.ftn.sluzba.entity.Student;

public class StudentDTO {
	public Long id;
	public String firstName;
	public String lastName;
	public String cardNumber;
	public Integer balance;
	public String accountNumber;

	public StudentDTO() {
	}

	public StudentDTO(Long id, String firstName, String lastName, String cardNumber, Integer balance,
			String accountNumber) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.cardNumber = cardNumber;
		this.balance = balance;
		this.accountNumber = accountNumber;
	}

	public StudentDTO(Student student) {
		this(student.getId(), student.getFirstName(), student.getLastName(), student.getCardNumber(),
				student.getBalance(), student.getAccountNumber());
	}

}
