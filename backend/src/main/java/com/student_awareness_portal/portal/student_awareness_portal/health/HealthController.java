package com.student_awareness_portal.portal.student_awareness_portal.health;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// @RequestMapping("/api")
public class HealthController {

    @GetMapping
    public String home() {
        return "Backend is running";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}