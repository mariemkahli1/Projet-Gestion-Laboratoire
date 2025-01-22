package com.example.demo.service;

import java.util.List;
import com.example.demo.entities.Outils;

public interface IOutilsService {

	Outils addOutil(Outils outil);
    List<Outils> getAllOutils();
    Outils findOutilById(Long id);
    void deleteOutil(Long id);
    Outils updateOutil(Outils outil);
    public List<Outils> findAll();
}
