package com.ftn.sluzba.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.sluzba.dto.AddTeacherDTO;
import com.ftn.sluzba.dto.LoginDTO;
import com.ftn.sluzba.dto.TeacherDTO;
import com.ftn.sluzba.entity.Teacher;
import com.ftn.sluzba.service.TeacherService;

@RestController
@RequestMapping(value = "api/teachers")
public class TeacherController {

	@Autowired
	private TeacherService teacherService;

	@GetMapping("")
	public ResponseEntity<?> getAllTeachers() {
		try {
			List<Teacher> teachers = teacherService.findAllTeachers();
			// convert teachers to DTOs
			List<TeacherDTO> teachersDTO = new ArrayList<>();
			for (Teacher s : teachers) {
				teachersDTO.add(new TeacherDTO(s));
			}
			return new ResponseEntity<>(teachersDTO, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Greska prilikom dobijanja liste korisnika.", HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("save")
	public ResponseEntity<?> saveTeacher(@RequestBody AddTeacherDTO addTeacherDTO) {
		try {
			Teacher savedTeacher = teacherService.saveTeacher(addTeacherDTO);

			TeacherDTO teacherDTO = new TeacherDTO(savedTeacher);

			return new ResponseEntity<>(teacherDTO, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
}
