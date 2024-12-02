package com.ftn.sluzba.dto;

import com.ftn.sluzba.entity.Teacher;

public class TeacherDTO {
	public Long id;
	public String firstName;
	public String lastName;
	
	public TeacherDTO() {
		
	}

	public TeacherDTO(Teacher teacher) {
		this(teacher.getId(), teacher.getFirstName(), teacher.getLastName());
	}

	public TeacherDTO(Long id, String firstName, String lastName) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
	}
}
