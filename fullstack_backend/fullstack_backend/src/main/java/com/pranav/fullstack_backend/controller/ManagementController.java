package com.pranav.fullstack_backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/management")
@CrossOrigin("*")
public class ManagementController {

    @GetMapping("/get")
    public String get() {
        return "GET:: management controller";
    }

    @PostMapping("/post")
    public String post() {
        return "POST:: management controller";
    }

    @PutMapping("/put")
    public String put() {
        return "PUT:: management controller";
    }

    @DeleteMapping("/delete")
    public String delete() {
        return "DELETE:: management controller";
    }
}
