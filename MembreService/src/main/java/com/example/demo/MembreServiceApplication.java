package com.example.demo;

import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

import com.example.demo.beans.PublicationBean;
import com.example.demo.dao.EtudiantRepository;
import com.example.demo.dao.MembreRepository;
import com.example.demo.entities.EnseignantChercheur;
import com.example.demo.entities.Etudiant;
import com.example.demo.proxies.PublicationProxyService;
import com.example.demo.service.IMembreService;

import lombok.AllArgsConstructor;


@SpringBootApplication
@AllArgsConstructor
@EnableDiscoveryClient
@EnableFeignClients
public class MembreServiceApplication implements CommandLineRunner {
    MembreRepository membreRepository;
    IMembreService membreService;
    EtudiantRepository etudiantRepository;  
    PublicationProxyService publicationProxyservice;
    
    IMembreService mbrservice;

    public static void main(String[] args) {
        SpringApplication.run(MembreServiceApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Etudiant etd1 = Etudiant.builder()
                .cin("123456")
                .dateInscription(new Date())
                .dateNaissance(new Date())
                .diplome("mastère")
                .email("etd1@gmail.com")
                .password("pass1")
                .encadrant(null)
                .cv("cv1")
                .nom("abid")
                .prenom("youssef")
                .sujet("blockchain")
                .build();

        Etudiant etd2 = Etudiant.builder()
                .cin("234567")
                .dateInscription(new Date())
                .dateNaissance(new Date())
                .diplome("mastère")
                .email("etd2@gmail.com")
                .password("pass2")
                .encadrant(null)
                .cv("cv2")
                .nom("Kahli")
                .prenom("Mariem")
                .sujet("blockchain")
                .build();

        EnseignantChercheur ens1 = EnseignantChercheur.builder()
                .cin("53535")
                .nom("Kahli")
                .prenom("Melek")
                .dateNaissance(new Date())
                .email("ens1@gmail.com")
                .password("passens1")
                .grade("1")
                .cv("cv2")
                .etablissement("Info")
                .sujet("blockchain")
                .build();

        EnseignantChercheur ens2 = EnseignantChercheur.builder()
                .cin("987654")
                .nom("Ben Said")
                .prenom("Ali")
                .dateNaissance(new Date())
                .email("ens2@gmail.com")
                .password("passens2")
                .grade("2")
                .cv("cv3")
                .etablissement("Science")
                .sujet("IA")
                .build();

        membreRepository.save(etd1);
        membreRepository.save(etd2);
        membreRepository.save(ens1);
        membreRepository.save(ens2);
        PublicationBean pub=publicationProxyservice.findPub(1L);
        System.out.println(pub.getTitre());
        
        mbrservice.affecterauteurTopublication(1L, 1L);

        

    }
}