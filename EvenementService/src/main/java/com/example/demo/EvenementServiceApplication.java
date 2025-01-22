package com.example.demo;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import com.example.demo.dao.EvenementRepository;
import com.example.demo.entities.Evenement;
import com.example.demo.service.IEvenementService;

@SpringBootApplication

public class EvenementServiceApplication implements CommandLineRunner{

	@Autowired
	private EvenementRepository evenementRepository;
	@Autowired
	private IEvenementService evenementService;
	RepositoryRestConfiguration configuration;
	
	public static void main(String[] args) {
		SpringApplication.run(EvenementServiceApplication.class, args);
	}

	public void run(String... args) throws Exception {
		Evenement evnt1 = Evenement.builder()
		        .titre("Conférence IA")
		        .description("Une conférence sur l'intelligence artificielle.")
		        .dateDebut(new Date())
		        .dateFin(new Date())
		        .build();
		Evenement evnt2 = Evenement.builder()
		        .titre("Conférence Cyber")
		        .description("Une conférence sur la Cyber Sécurité")
		        .dateDebut(new Date())
		        .dateFin(new Date())
		        .build();
		Evenement evnt3 = Evenement.builder()
		        .titre("Conférence Blockchain")
		        .description("Une conférence sur le Blockchain")
		        .dateDebut(new Date())
		        .dateFin(new Date())
		        .build();
		evenementRepository.save(evnt1);
		evenementRepository.save(evnt2);
		evenementRepository.save(evnt3);
		System.out.println("Liste des evenements dans le labo:");
        List<Evenement> evenements = evenementRepository.findAll();
        for (Evenement evenemrnt : evenements)
            System.out.println(evenemrnt.getTitre() + " " + evenemrnt.getDescription());
        Evenement evt1 = evenementRepository.findById(1L).get();
        System.out.println(evt1);
        evt1.setTitre("Conférence IA 1ere session");
        evenementRepository.save(evt1);
        evenementRepository.deleteById(2L);
		
        
        Evenement evt = evenementService.findEvenementById(1L);
        evt.setDescription("Une conférence sur l'intelligence artificielle 1ere session");
        evenementService.updateEvenement(evt);
        evenementService.deleteEvenement(3L);
        
	}
	
	
}
