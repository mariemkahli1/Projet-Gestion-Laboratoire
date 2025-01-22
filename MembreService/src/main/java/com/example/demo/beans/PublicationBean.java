package com.example.demo.beans;



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

@Data

public class PublicationBean {

	
     private Long id ;
	
	private String titre;
	
	private String type;
	
	private String lien;
	
    private Date date;
	
	private String sourcepdf;
	
}
