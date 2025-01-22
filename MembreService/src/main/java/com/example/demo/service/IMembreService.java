package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.beans.PublicationBean;
import com.example.demo.entities.EnseignantChercheur;
import com.example.demo.entities.Etudiant;
import com.example.demo.entities.Membre;
import com.example.demo.entities.Membre_Publication;

@Service
public interface IMembreService {
	//Crud sur les membres
		public Membre addMember(Membre m);
		public void deleteMember(Long id) ;
		public Membre updateMember(Membre p) ;
		public Membre findMember(Long id) ;
		public List<Membre> findAll();
		//Filtrage par propriété
		public Membre findByCin(String cin);
		public Membre findByEmail(String email);
		public List<Membre> findByNom(String nom);
		//recherche spécifique des étudiants
		public List<Etudiant> findByDiplome(String diplome);
		//recherche spécifique des enseignants
		public List<EnseignantChercheur> findByGrade(String grade);
		public List<EnseignantChercheur> findByEtablissement(String etablissement);
		public void assignStudentToTeacher(Long studentId, Long teacherId); // Affecter un étudiant à un enseignant
		// Recherche des étudiants encadrés par un enseignant
		public List<Etudiant> getStudentsByTeacher(Long enseignantId);
		public void affecterauteurTopublication(Long idauteur, Long idpub);
		public List<PublicationBean> findPublicationparauteur (Long idauteur);
		public void assignPublication(Membre_Publication membrePub);


}