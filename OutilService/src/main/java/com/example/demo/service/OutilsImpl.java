package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.dao.OutilsRepository;
import com.example.demo.entities.Outils;

@Service
public class OutilsImpl implements IOutilsService {

	@Autowired
	private OutilsRepository outilsRepository;

	@Override
	public Outils addOutil(Outils outil) {
        return outilsRepository.save(outil);
    }

    @Override
    public List<Outils> getAllOutils() {
        return outilsRepository.findAll();
    }

    @Override
    public Outils findOutilById(Long id) {
    	Outils o= (Outils)outilsRepository.findById(id).get();
		return o;
    }

    @Override
    public void deleteOutil(Long id) {
        outilsRepository.deleteById(id);
    }

    @Override
    public Outils updateOutil(Outils outil) {
    	return outilsRepository.saveAndFlush(outil);
    }
    @Override
    public List<Outils> findAll() {
		return outilsRepository.findAll();}

}
