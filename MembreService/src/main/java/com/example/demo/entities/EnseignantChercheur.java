package com.example.demo.entities;

import java.util.Date;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("ens")
@Getter @Setter
@NoArgsConstructor 
public class EnseignantChercheur extends Membre {
    private String grade;
    
    private String sujet;
    
    private String etablissement;
    @Builder
    public EnseignantChercheur(String cin, String nom, String prenom, Date dateNaissance, String cv, 
                               String email, String password, String grade, String sujet, String etablissement) {
        super(cin, nom, prenom, dateNaissance, cv, email, password);
        this.grade = grade;
        this.sujet = sujet;
        this.etablissement = etablissement;
    }
}