package com.ftn.sluzba.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.sluzba.dto.AddStudentDTO;
import com.ftn.sluzba.dto.StudentDTO;
import com.ftn.sluzba.entity.Student;
import com.ftn.sluzba.entity.User;
import com.ftn.sluzba.repository.StudentRepository;

@Service
public class StudentService {

	@Autowired
	StudentRepository studentRepository;

	@Autowired
	UserService userService;

	public List<StudentDTO> findAllStudents() {
		List<Student> students = studentRepository.findAll();
		// convert teachers to DTOs
		List<StudentDTO> studentsDTO = new ArrayList<>();
		for (Student s : students) {
			studentsDTO.add(new StudentDTO(s));
		}

		return studentsDTO;
	}

	public StudentDTO saveStudent(AddStudentDTO addStudentDTO) {
		User user = userService.saveUser(addStudentDTO);

		Student student = new Student(addStudentDTO.firstName, addStudentDTO.lastName, addStudentDTO.cardNumber, 0, "",
				user);

		studentRepository.save(student);

		StudentDTO studentDTO = new StudentDTO(student);

		return studentDTO;
	}

}
