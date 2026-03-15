package com.student_awareness_portal.portal.student_awareness_portal.api.student;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsByEmail(String email);

    List<Student> findByDepartment(String department, Sort sort);

    List<Student> findByYear(Integer year, Sort sort);

    List<Student> findByDepartmentAndYear(String department, Integer year, Sort sort);

    List<Student> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name, String email, Sort sort);
}