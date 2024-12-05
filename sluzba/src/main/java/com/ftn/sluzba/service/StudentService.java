package com.ftn.sluzba.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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

		String accountNumber = generateAccountNumber();
		System.out.println(accountNumber);
		Student student = new Student(addStudentDTO.firstName, addStudentDTO.lastName, addStudentDTO.cardNumber, 0,
				accountNumber, user);

		studentRepository.save(student);

		StudentDTO studentDTO = new StudentDTO(student);

		return studentDTO;
	}

	private static String generateAccountNumber() {
		Integer lenghtOfAccountNumber = 18;

		Random random = new Random();
		StringBuilder accountNumber = new StringBuilder();

		// Ensure the first digit is not 0
		accountNumber.append(random.nextInt(9) + 1);

		// Generate the remaining digits
		for (int i = 1; i < lenghtOfAccountNumber; i++) {
			if (i == 3 || i == 16) {
				accountNumber.append("-");
			}
			accountNumber.append(random.nextInt(10));
		}

		return accountNumber.toString();
	}

}
