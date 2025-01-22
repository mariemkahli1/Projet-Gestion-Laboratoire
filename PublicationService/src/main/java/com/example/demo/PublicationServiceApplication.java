package com.example.demo;

import java.util.Date;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import com.example.demo.dao.PublicationRepository;
import com.example.demo.entities.Publication;
import com.example.demo.service.PublicationImpl;

import lombok.AllArgsConstructor;

@SpringBootApplication
@AllArgsConstructor
@EnableDiscoveryClient

public class PublicationServiceApplication implements CommandLineRunner{
	PublicationRepository publicationRepository;
	PublicationImpl publicationService;
	RepositoryRestConfiguration configuration;
	public static void main(String[] args) {
		SpringApplication.run(PublicationServiceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		configuration.exposeIdsFor(Publication.class);
		Publication publication1 = Publication.builder()
	           
	            .type("Article")
	            .titre("titre1")
	            .lien("lien1")
	            .date(new Date())
	            .sourcepdf("source1")
	            .build();
		Publication publication2 = Publication.builder()
	            
	            .type("Article")
	            .titre("titre2")
	            .lien("lien2")
	            .date(new Date())
	            .sourcepdf("source2")
	            .build();
		Publication publication3 = Publication.builder()
	            
	            .type("Article")
	            .titre("titre3")
	            .lien("lien3")
	            .date(new Date())
	            .sourcepdf("Source3")
	            .build();
		publicationRepository.save(publication1);
		publicationRepository.save(publication2);
		publicationRepository.save(publication3);
		

		
	}

}