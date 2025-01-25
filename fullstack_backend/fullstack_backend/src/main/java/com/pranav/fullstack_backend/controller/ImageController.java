package com.pranav.fullstack_backend.controller;

import com.pranav.fullstack_backend.response.ImageDeleteResponse;
import com.pranav.fullstack_backend.response.ImageUploadResponse;
import com.pranav.fullstack_backend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/image")
@CrossOrigin("*")
public class ImageController {
    @Autowired
    private ImageService service;
    @PostMapping(value = "/uploadImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ImageUploadResponse> uploadImage(
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.uploadImage(file));
    }

    @DeleteMapping("/deleteImage/{fileId}")
    public ResponseEntity<ImageDeleteResponse> deleteImage(
            @PathVariable("fileId") Integer fileId
    ) throws IOException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.deleteImage(fileId));
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable String fileName){
        byte[] imageData = service.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);

    }

    @GetMapping("/getAllImages")
    public ResponseEntity<?>getAllImages() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.getAllImages());
    }
}
