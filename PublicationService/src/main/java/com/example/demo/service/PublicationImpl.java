package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dao.PublicationRepository;
import com.example.demo.entities.Publication;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class PublicationImpl implements IPublicationService{
	PublicationRepository publicationRepository;
	@Override
    public Publication addPublication(Publication publication) {
        return publicationRepository.save(publication);
    }

    @Override
    public List<Publication> getAllPublications() {
        return publicationRepository.findAll();
    }

    @Override
    public Publication findPublicationById(Long id) {
    	Publication o= (Publication)publicationRepository.findById(id).get();
		return o;
    }

    @Override
    public void deletePublication(Long id) {
        publicationRepository.deleteById(id);
    }

    @Override
    public Publication updatePublication(Publication publication) {
    	return publicationRepository.saveAndFlush(publication);
    }
	

}