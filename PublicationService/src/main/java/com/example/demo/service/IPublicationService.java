package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entities.Publication;

@Service
public interface IPublicationService {
    Publication addPublication(Publication publication);
    List<Publication> getAllPublications();
    Publication findPublicationById(Long id);
    void deletePublication(Long id);
    Publication updatePublication(Publication publication);
}
