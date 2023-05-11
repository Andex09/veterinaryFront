import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pet } from '../interfaces/Pet';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryService {
  private appUrl: string = environment.endpoint;
  private apiUrl: string = "api/Pet/";

  constructor(private http: HttpClient) { }

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.appUrl}${this.apiUrl}`);
  }

  getPet(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.appUrl}${this.apiUrl}${id}`);
  }

  deletePet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.appUrl}${this.apiUrl}${id}`);
  }

  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(`${this.appUrl}${this.apiUrl}`, pet);
  }

  updatePet(id: number, pet: Pet): Observable<void> {
    return this.http.put<void>(`${this.appUrl}${this.apiUrl}${id}`, pet);
  }
}
