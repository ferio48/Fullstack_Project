package com.pranav.fullstack_backend.service;

import com.pranav.fullstack_backend.model.Image;
import com.pranav.fullstack_backend.response.ImageDeleteResponse;
import com.pranav.fullstack_backend.response.ImageUploadResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    ImageUploadResponse uploadImage(MultipartFile file) throws IOException;

    ImageDeleteResponse deleteImage(Integer fileId);

    byte[] downloadImage(String fileName);

    List<Image> getAllImages();
}
