package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod; 
import com.example.demo.entities.Evenement;
import com.example.demo.service.IEvenementService;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@AllArgsConstructor
public class EvenementController {
private final IEvenementService evenementService;

//Récupérer la liste de tous les événements
@GetMapping(value = "/evenements")
public List<Evenement> findAllEvenements() {
    return evenementService.findAllEvenements();
}

// Récupérer un événement par son ID
@GetMapping(value = "/evenements/{id}")
public Evenement findEvenementById(@PathVariable Long id) {
    return evenementService.findEvenementById(id);
}

// Ajouter un nouvel événement
@PostMapping(value = "/evenements")
public Evenement addEvenement(@RequestBody Evenement evenement) {
    return evenementService.addEvenement(evenement);
}

// Mettre à jour un événement
@PutMapping(value = "/evenements/{id}")
public Evenement updateEvenement(@PathVariable Long id, @RequestBody Evenement evenement) {
    evenement.setId(id);
    return evenementService.updateEvenement(evenement);
}

// Supprimer un événement
@DeleteMapping(value = "/evenements/{id}")
public void deleteEvenement(@PathVariable Long id) {
    evenementService.deleteEvenement(id);
}
}
