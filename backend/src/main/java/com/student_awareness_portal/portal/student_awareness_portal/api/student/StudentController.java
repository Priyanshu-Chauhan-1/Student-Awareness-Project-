package com.student_awareness_portal.portal.student_awareness_portal.api.student;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentRepository repo;

    public StudentController(StudentRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Student> all() {
        return repo.findAll();
    }

    // Optional but useful
    @GetMapping("/{id}")
    public Student getOne(@PathVariable Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student create(@RequestBody Student s) {
        if (s.getName() == null || s.getName().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "name is required");
        }
        if (s.getEmail() == null || s.getEmail().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "email is required");
        }
        if (s.getDepartment() == null || s.getDepartment().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "department is required");
        }
        if (s.getYear() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "year is required");
        }

        String email = s.getEmail().trim();
        if (repo.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "email already exists");
        }

        s.setId(null);
        s.setEmail(email);
        s.setName(s.getName().trim());
        s.setDepartment(s.getDepartment().trim());
        return repo.save(s);
    }

    // Day 4: Update existing student
    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @RequestBody Student incoming) {
        Student existing = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        if (incoming.getName() == null || incoming.getName().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "name is required");
        }
        if (incoming.getEmail() == null || incoming.getEmail().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "email is required");
        }
        if (incoming.getDepartment() == null || incoming.getDepartment().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "department is required");
        }
        if (incoming.getYear() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "year is required");
        }

        String newEmail = incoming.getEmail().trim();

        // If email is changed, ensure it's unique
        if (!newEmail.equalsIgnoreCase(existing.getEmail()) && repo.existsByEmail(newEmail)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "email already exists");
        }

        existing.setName(incoming.getName().trim());
        existing.setEmail(newEmail);
        existing.setDepartment(incoming.getDepartment().trim());
        existing.setYear(incoming.getYear());

        return repo.save(existing);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found");
        }
        repo.deleteById(id);
    }
}