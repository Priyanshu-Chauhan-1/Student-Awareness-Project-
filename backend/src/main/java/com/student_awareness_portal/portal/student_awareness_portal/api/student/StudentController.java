package com.student_awareness_portal.portal.student_awareness_portal.api.student;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // optional if you use Vite proxy
@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentRepository repo;

    public StudentController(StudentRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Student> getAll() {
        return repo.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student create(@RequestBody Student s) {
        if (s.getEmail() == null || s.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("email is required");
        }
        if (repo.existsByEmail(s.getEmail().trim())) {
            throw new IllegalArgumentException("email already exists");
        }
        s.setId(null); // ensure create
        s.setEmail(s.getEmail().trim());
        return repo.save(s);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}