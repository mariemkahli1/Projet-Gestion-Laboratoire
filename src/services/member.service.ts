import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { GLOBAL } from 'src/app/app-config';
import { Membre_Article } from 'src/models/Membre_Article';

import { Member } from 'src/models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private readonly baseUrl = 'http://localhost:9000/MEMBRESERVICE/membres';
  students: Member[] = [];
  teachers: Member[] = [];
  
  constructor(private httpClient: HttpClient) {}

  getMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Error fetching members:', error);
        return throwError(() => new Error('Error fetching members'));
      })
    );
  }

  getFullMember(id: string): Observable<Member> {
    return this.httpClient.get<Member>(`${this.baseUrl}/fullmember/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching full member with ID ${id}:`, error);
        return throwError(() => new Error('Error fetching full member'));
      })
    );
  }

  getAllTeachers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.baseUrl}/enseignant`).pipe(
      tap((members) => (this.teachers = members)),
      catchError((error) => {
        console.error('Error fetching teachers:', error);
        return throwError(() => new Error('Error fetching teachers'));
      })
    );
  }

  getAllStudents(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.baseUrl}/etudiant`).pipe(
      tap((members) => (this.students = members)),
      catchError((error) => {
        console.error('Error fetching students:', error);
        return throwError(() => new Error('Error fetching students'));
      })
    );
  }

  saveEtudiant(etudiant: Member): Observable<Member> {
    return this.httpClient.post<Member>(`${this.baseUrl}/etudiant`, etudiant).pipe(
      catchError((error) => {
        console.error('Error saving student:', error);
        return throwError(() => new Error('Error saving student'));
      })
    );
  }


  saveMember(member: Member): Observable<Member> {
    return this.httpClient.post<Member>('http://localhost:9000/MEMBRESERVICE/membres/m', member).pipe(
      catchError((error) => {
        console.error('Error saving member:', error);
        throw new Error('Error saving Member'); // Customize error handling
      })
    );
  }


  saveEnseignant(enseignant: Member): Observable<Member> {
    return this.httpClient.post<Member>(`${this.baseUrl}/enseignant`, enseignant).pipe(
      catchError((error) => {
        console.error('Error saving teacher:', error);
        return throwError(() => new Error('Error saving teacher'));
      })
    );
  }

  getMemberById(id: string): Observable<Member> {
    return this.httpClient.get<Member>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching member with ID ${id}:`, error);
        return throwError(() => new Error('Error fetching member by ID'));
      })
    );
  }

  deleteMemberById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error deleting member with ID ${id}:`, error);
        return throwError(() => new Error('Error deleting member'));
      })
    );
  }

  assignPublication(memberArticle: Membre_Article): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/publication`, memberArticle).pipe(
      catchError((error) => {
        console.error('Error assigning publication:', error);
        return throwError(() => new Error('Error assigning publication'));
      })
    );
  }
  updateEtudiant(id: string, etudiant: Member): Observable<Member> {
    return this.httpClient.put<Member>(`${this.baseUrl}/etudiant/${id}`, etudiant).pipe(
      catchError((error) => {
        console.error(`Error updating student with ID ${id}:`, error);
        return throwError(() => new Error('Error updating student'));
      })
    );
  }
  
  updateEnseignant(id: string, enseignant: Member): Observable<Member> {
    return this.httpClient.put<Member>(`${this.baseUrl}/enseignant/${id}`, enseignant).pipe(
      catchError((error) => {
        console.error(`Error updating teacher with ID ${id}:`, error);
        return throwError(() => new Error('Error updating teacher'));
      })
    );
  }
  updateMember(id: string, member: Member): Observable<Member> {
    return this.httpClient.put<Member>(`${this.baseUrl}/${id}`, member).pipe(
      catchError((error) => {
        console.error(`Error updating member with ID ${id}:`, error);
        return throwError(() => new Error('Error updating member'));
      })
    );
  }
  
}
