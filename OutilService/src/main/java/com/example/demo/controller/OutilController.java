package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Outils;
import com.example.demo.service.IOutilsService;

import lombok.AllArgsConstructor;

@RestController
@CrossOrigin 
@AllArgsConstructor
public class OutilController {
private final IOutilsService outilService;

// Récupérer la liste de tous les outils
@GetMapping(value = "/outils")
public List<Outils> findAllOutils() {
    return outilService.findAll();
}

// Récupérer un outil par son ID

public Outils findOutilById(@PathVariable Long id) {
    return outilService.findOutilById(id);
}

// Ajouter un nouvel outil
@PostMapping(value = "/outils")
public Outils addOutil(@RequestBody Outils outil) {
    return outilService.addOutil(outil);
}

// Mettre à jour un outil
@PutMapping(value = "/outils/{id}")
public Outils updateOutil(@PathVariable Long id, @RequestBody Outils outil) {
    outil.setId(id);
    return outilService.updateOutil(outil);
}

// Supprimer un outil
@DeleteMapping(value = "/outils/{id}")
public void deleteOutil(@PathVariable Long id) {
    outilService.deleteOutil(id);
}
}