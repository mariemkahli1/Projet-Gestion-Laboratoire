package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.beans.PublicationBean;
import com.example.demo.dao.EnseignantChercheurRepository;
import com.example.demo.dao.EtudiantRepository;
import com.example.demo.dao.MembrePubRepository;
import com.example.demo.dao.MembreRepository;
import com.example.demo.entities.EnseignantChercheur;
import com.example.demo.entities.Etudiant;
import com.example.demo.entities.Membre;
import com.example.demo.entities.Membre_Pub_Id;
import com.example.demo.entities.Membre_Publication;
import com.example.demo.proxies.PublicationProxyService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MemberImpl implements IMembreService {
	MembreRepository memberRepository;
	EtudiantRepository etudiantRepository;
	EnseignantChercheurRepository enseignantChercheurRepository;
	MembrePubRepository membrepubrepository;
	PublicationProxyService proxy;
		
		public Membre addMember(Membre m) {
		memberRepository.save(m);
		return m;
		}
		public void deleteMember(Long id) {
		memberRepository.deleteById(id);
		}
		public Membre updateMember(Membre m) {
		return memberRepository.saveAndFlush(m);
		}
		public Membre findMember(Long id) {
		Membre m= (Membre)memberRepository.findById(id).get();
		return m;
		}
		public List<Membre> findAll() {
			return memberRepository.findAll();}
		public Membre findByCin(String cin) {
			return memberRepository.findByCin(cin);}
		public Membre findByEmail(String email) {
			return memberRepository.findByEmail(email);}
		public List<Membre> findByNom(String nom) {
			return memberRepository.findByNom(nom);}	
		public List<Etudiant> findByDiplome(String diplome) {
			return etudiantRepository.findByDiplome(diplome);
			}
		public List<EnseignantChercheur> findByGrade(String grade) {
			return enseignantChercheurRepository.findByGrade(grade);
		}
		public List<EnseignantChercheur> findByEtablissement(String etablissement) {
			return enseignantChercheurRepository.findByEtablissement(etablissement);
		}
		@Override
	    public void assignStudentToTeacher(Long studentId, Long teacherId) {
	        // Recherche de l'étudiant par ID
	        Etudiant student = etudiantRepository.findById(studentId)
	                .orElseThrow(() -> new IllegalArgumentException("Étudiant introuvable avec l'ID " + studentId));

	        // Recherche de l'enseignant par ID
	        EnseignantChercheur teacher = enseignantChercheurRepository.findById(teacherId)
	                .orElseThrow(() -> new IllegalArgumentException("Enseignant introuvable avec l'ID " + teacherId));

	        // Affectation de l'étudiant à l'enseignant
	        student.setEncadrant(teacher);

	        // Sauvegarde de l'étudiant mis à jour
	        etudiantRepository.save(student);
	    }
		@Override
		public List<Etudiant> getStudentsByTeacher(Long enseignantId) {
		    // Appeler le repository de l'étudiant pour récupérer la liste des étudiants encadrés par un enseignant
		    return etudiantRepository.findByEncadrantId(enseignantId);
		}
		public void affecterauteurTopublication(Long idauteur, Long idpub)
		{
		Membre mbr= memberRepository.findById(idauteur).get();
		Membre_Publication mbs= new Membre_Publication();
		mbs.setAuteur(mbr);
		mbs.setId(new Membre_Pub_Id(idpub, idauteur));
		membrepubrepository.save(mbs);
		}
		public List<PublicationBean> findPublicationparauteur(Long idauteur) {
			List<PublicationBean> pubs=new ArrayList<PublicationBean>();
			List< Membre_Publication>
			idpubs=membrepubrepository.findpubId(idauteur);
			idpubs.forEach(s->{
			System.out.println(s);
			pubs.add(proxy.findPub(s.getId().getPublication_id()))
			;
			}
			);
			return pubs;
			}
		@Override
		public void assignPublication(Membre_Publication membrePub) {
			// TODO Auto-generated method stub
			
		}

		
	}