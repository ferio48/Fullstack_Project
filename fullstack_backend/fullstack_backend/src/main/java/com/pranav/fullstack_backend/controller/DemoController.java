package com.pranav.fullstack_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/demo")
public class DemoController {

    @GetMapping("/get")
    public String sayHello() {
        return "Hello from secured endpoint";
    }
}
