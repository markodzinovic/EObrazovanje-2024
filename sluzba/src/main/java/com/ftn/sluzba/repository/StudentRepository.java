package com.ftn.sluzba.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ftn.sluzba.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

}
