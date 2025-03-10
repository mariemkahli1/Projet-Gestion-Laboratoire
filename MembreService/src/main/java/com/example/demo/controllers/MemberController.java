package com.example.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.EnseignantChercheur;
import com.example.demo.entities.Etudiant;
import com.example.demo.entities.Membre;
import com.example.demo.entities.Membre_Publication;
import com.example.demo.service.IMembreService;

import lombok.AllArgsConstructor;
@RestController
@CrossOrigin 
@AllArgsConstructor
public class MemberController {

	private final IMembreService memberService;

	@GetMapping(value = "/membres")
	public List<Membre> findMembres() {
		return memberService.findAll();
	}

	@GetMapping(value = "/membres/{id}")
	public Membre findOneMemberById(@PathVariable Long id) {
		return memberService.findMember(id);
	}

	@GetMapping(value = "/membres/search/cin")
	public Membre findOneMemberByCin(@RequestParam String cin) {
		return memberService.findByCin(cin);
	}

	@GetMapping(value = "/membres/search/email")
	public Membre findOneMemberByEmail(@RequestParam String email) {
		return memberService.findByEmail(email);
	}

	@PostMapping(value = "/membres/enseignant")
	public Membre addMembre(@RequestBody EnseignantChercheur m) {
		return memberService.addMember(m);
	}

	@PostMapping(value = "/membres/etudiant")
	public Membre addMembre(@RequestBody Etudiant m) {
		return memberService.addMember(m);
	}
	@PostMapping(value = "/membres/m")
	public Membre addMembre(@RequestBody Membre m) {
		return memberService.addMember(m);
	}

	@DeleteMapping(value="/membres/{id}")
	public void deleteMembre(@PathVariable Long id)
	{

	memberService.deleteMember(id);

	}
	@PutMapping(value="/membres/etudiant/{id}")
	public Membre updatemembre(@PathVariable Long id, @RequestBody
	Etudiant p)
	{

	p.setId(id);
	return memberService.updateMember(p);

	}
	@PutMapping(value="/membres/enseignant/{id}")
	public Membre updateMembre(@PathVariable Long id, @RequestBody
	EnseignantChercheur p)
	{

	p.setId(id);
	return memberService.updateMember(p);

	}
	@PostMapping(value = "/membres/publication")
	public void assignPublication(@RequestBody Membre_Publication membrePub) {
	    memberService.assignPublication(membrePub);
	}
	@GetMapping("/fullmember/{id}")
	public Membre findAFullMember(@PathVariable(name="id") Long id)
	{

	Membre mbr=memberService.findMember(id);
	mbr.setPubs(memberService.findPublicationparauteur(id));

	return mbr;
	}
}