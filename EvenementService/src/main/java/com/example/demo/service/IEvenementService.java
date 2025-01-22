package com.example.demo.service;

import java.util.List;

import com.example.demo.entities.Evenement;

public interface IEvenementService {
	Evenement addEvenement(Evenement evenement);
    Evenement updateEvenement(Evenement evenement);
    void deleteEvenement(Long id);
    Evenement findEvenementById(Long id);
    List<Evenement> findAllEvenements();
    List<Evenement> findEvenementsByTitre(String titre);
}
