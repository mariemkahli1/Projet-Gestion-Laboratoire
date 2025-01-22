package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Publication;
import com.example.demo.service.IPublicationService;

import lombok.AllArgsConstructor;

@RestController
@CrossOrigin
@AllArgsConstructor
public class PublicationController {

    private final IPublicationService publicationService;

    // Récupérer toutes les publications
    @GetMapping(value = "/publications")
    public List<Publication> findAllPublications() {
        return publicationService.getAllPublications();
    }

    // Récupérer une publication par son ID
    @GetMapping(value = "/publications/{id}")
    public Publication findPublicationById(@PathVariable Long id) {
        return publicationService.findPublicationById(id);
    }

    // Ajouter une nouvelle publication
    @PostMapping(value = "/publications")
    public Publication addPublication(@RequestBody Publication publication) {
        return publicationService.addPublication(publication);
    }

    // Mettre à jour une publication existante
    @PutMapping(value = "/publications/{id}")
    public Publication updatePublication(@PathVariable Long id, @RequestBody Publication publication) {
        publication.setId(id);
        return publicationService.updatePublication(publication);
    }

    // Supprimer une publication
    @DeleteMapping(value = "/publications/{id}")
    public void deletePublication(@PathVariable Long id) {
        publicationService.deletePublication(id);
    }
}