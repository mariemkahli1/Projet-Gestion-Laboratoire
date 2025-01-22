package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.EvenementRepository;
import com.example.demo.entities.Evenement;

@Service
public class EvenementImpl implements IEvenementService {

	
	@Autowired 
	private EvenementRepository evenementRepository;

	@Override
    public Evenement addEvenement(Evenement evenement) {
        return evenementRepository.save(evenement);
    }

    @Override
    public Evenement updateEvenement(Evenement evenement) {
        return evenementRepository.save(evenement);
    }

    @Override
    public void deleteEvenement(Long id) {
        evenementRepository.deleteById(id);
    }

    @Override
    public Evenement findEvenementById(Long id) {
        return evenementRepository.findById(id).orElse(null);
    }

    @Override
    public List<Evenement> findAllEvenements() {
        return evenementRepository.findAll();
    }

    @Override
    public List<Evenement> findEvenementsByTitre(String titre) {
        return evenementRepository.findByTitreContaining(titre);
    }
}
