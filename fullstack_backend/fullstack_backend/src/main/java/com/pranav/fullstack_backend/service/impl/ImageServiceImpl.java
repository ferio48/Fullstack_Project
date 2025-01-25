package com.pranav.fullstack_backend.service.impl;

import com.pranav.fullstack_backend.dao.StorageRepository;
import com.pranav.fullstack_backend.model.Image;
import com.pranav.fullstack_backend.response.ImageDeleteResponse;
import com.pranav.fullstack_backend.response.ImageUploadResponse;
import com.pranav.fullstack_backend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService {
    @Autowired
    private StorageRepository repository;
    @Override
    public ImageUploadResponse uploadImage(MultipartFile file) throws IOException {
        Image imageData = repository.save(Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(file.getBytes())
                .build());
        ImageUploadResponse response = ImageUploadResponse.builder().build();
        if(imageData != null) response.setUploadResponse("File uploaded successfully: " + file.getOriginalFilename());
        else response.setUploadResponse("File not uploaded");

        return response;
    }

    @Override
    public ImageDeleteResponse deleteImage(Integer fileId) {
//        Optional<Image> dbImageData = repository.findByName(fileName);
        Optional<Image> dbImageData = repository.findById(fileId);
        ImageDeleteResponse response = ImageDeleteResponse.builder().build();
        if(dbImageData.isPresent()) {
            repository.delete(dbImageData.get());
            response.setDeleteResponse("Image Deleted Successfully");
        } else {
            response.setDeleteResponse("Image Not Found");
        }
        return  response;
    }

    @Override
    public byte[] downloadImage(String fileName) {
        Optional<Image> dbImageData = repository.findByName(fileName);
        byte[] image = dbImageData.get().getImageData();
        return image;
    }

    @Override
    public List<Image> getAllImages() {
        return repository.findAll();
    }
}
