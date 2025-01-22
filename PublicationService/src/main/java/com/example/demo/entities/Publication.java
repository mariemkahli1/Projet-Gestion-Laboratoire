package com.example.demo.entities;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Publication implements Serializable{

	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id ;
	@NonNull
	private String titre;
	@NonNull
	private String type;
	@NonNull
	private String lien;
	@NonNull
	@Temporal(TemporalType.DATE)
    private Date date;
	@NonNull
	private String sourcepdf;
	
}
