package com.ftn.sluzba.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.sluzba.dto.AddStudentDTO;
import com.ftn.sluzba.dto.StudentDTO;
import com.ftn.sluzba.service.StudentService;

@RestController
@RequestMapping(value = "api/students")
public class StudentController {

	@Autowired
	StudentService studentService;

	@GetMapping("")
	public ResponseEntity<?> getAllStudents() {
		try {
			List<StudentDTO> students = studentService.findAllStudents();
			return new ResponseEntity<>(students, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Greska prilikom dobijanja liste studenata.", HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("save")
	public ResponseEntity<?> saveStudent(@RequestBody AddStudentDTO addStudentDTO) {
		try {
			StudentDTO studentDTO = studentService.saveStudent(addStudentDTO);

			return new ResponseEntity<>(studentDTO, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
}
