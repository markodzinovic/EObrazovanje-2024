package com.ftn.sluzba.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.sluzba.dto.AddTeacherDTO;
import com.ftn.sluzba.entity.Teacher;
import com.ftn.sluzba.entity.User;
import com.ftn.sluzba.repository.TeacherRepository;

@Service
public class TeacherService {

	@Autowired
	TeacherRepository teacherRepository;
	
	@Autowired
	UserService userService;

	public List<Teacher> findAllTeachers() {
		return teacherRepository.findAll();
	}
	
	public Teacher saveTeacher(AddTeacherDTO addTeacherDTO) {

        User user = userService.saveUser(addTeacherDTO);

        // Map DTO to Teacher entity
        Teacher teacher = new Teacher();
        teacher.setFirstName(addTeacherDTO.firstName);
        teacher.setLastName(addTeacherDTO.lastName);
        teacher.setUser(user); // Link User to Teacher

        // Save Teacher entity
        return teacherRepository.save(teacher);
    }
	
}
