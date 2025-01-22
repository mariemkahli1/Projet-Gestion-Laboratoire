package com.example.demo;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.demo.dao.OutilsRepository;
import com.example.demo.entities.Outils;
import com.example.demo.service.IOutilsService;

@SpringBootApplication
public class OutilServiceApplication implements CommandLineRunner {

	@Autowired
	private OutilsRepository outilsRepository;

	@Autowired
	private IOutilsService outilsService;

	public static void main(String[] args) {
		SpringApplication.run(OutilServiceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Outils outil1 = Outils.builder().date(new Date()).source("Source1").build();
		Outils outil2 = Outils.builder().date(new Date()).source("Source2").build();
		Outils outil3 = Outils.builder().date(new Date()).source("Source3").build();

		outilsRepository.save(outil1);
		outilsRepository.save(outil2);
		outilsRepository.save(outil3);
		System.out.println("Liste des outils dans le labo:");
		List<Outils> outils = outilsRepository.findAll();
		for (Outils outil : outils)
			System.out.println(outil.getSource() + " " + outil.getDate());
		Outils o1 = outilsRepository.findById(1L).get();
		System.out.println(o1);
		o1.setSource("SourceDeOutil1");
		outilsRepository.save(o1);
		outilsRepository.deleteById(3L);

		Outils o = outilsService.findOutilById(2L);
		o.setSource("SourcePourOutil2");
		outilsService.updateOutil(o);

		outilsService.deleteOutil(2L);

	}
}
