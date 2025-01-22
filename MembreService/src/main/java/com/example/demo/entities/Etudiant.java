package com.example.demo.entities;

import java.util.Date;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor 
@DiscriminatorValue("etd")
public class Etudiant extends Membre {
    
    @NonNull
    private Date dateInscription;
    
    @NonNull
    private String sujet;
    
   
    @NonNull
    private String diplome;
    
    @ManyToOne
    private EnseignantChercheur encadrant;

    // Constructor to initialize fields that are inherited and new fields.
    @Builder
    public Etudiant(String cin, String nom, String prenom, Date dateNaissance, String cv, String email, 
                    String password, Date dateInscription, String sujet, String diplome, EnseignantChercheur encadrant) {
        super(cin, nom, prenom, dateNaissance, cv, email, password);  // Calls the Membre constructor
        this.dateInscription = dateInscription;
        this.diplome = diplome;
        this.encadrant = encadrant;
        this.sujet=sujet;
    }
}