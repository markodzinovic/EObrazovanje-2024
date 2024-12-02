package com.ftn.sluzba.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ftn.sluzba.entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

}
