import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private apiUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    return this.http.get(`${this.apiUrl}/people/`).pipe(
      map((response: any) => response.results)
    );
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/people/${id}`);
  }

  getMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/films/`).pipe(
      map((response: any) => response.results)
    );
  }

  getSpecies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/species/`).pipe(
      map((response: any) => response.results)
    );
  }

  getStarship(url: string): Observable<any> {
    return this.http.get(url);
  }
  getPeople(): Observable<any[]> {
    return this.getAllPages(`${this.apiUrl}/people/`);
  }
  private getAllPages(url: string): Observable<any[]> {
    return this.http.get<any>(url).pipe(
      mergeMap(data => {
        if (data.next) {
          return forkJoin([
            this.http.get<any>(data.next).pipe(
              mergeMap(nextData => this.getAllPages(nextData.next))
            ),
            [data]
          ]).pipe(
            map(results => results.flat())
          );
        } else {
          return [data.results];
        }
      }),
      map(results => results.flat())
    );
  }


  getCharactersByFilters(filters: any): Observable<any[]> {
    const { movie, species, startYear, endYear } = filters;
    const yearRange = [startYear, endYear].map(year => parseInt(year.replace('BBY', '').replace('ABY', ''), 10));
    
    return forkJoin([
      this.getCharacters(),
      movie ? this.http.get<any>(movie).pipe(map(response => response.characters)) : this.getCharacters().pipe(map(characters => characters.map((character:any) => character.url))),
      species ? this.http.get<any>(species).pipe(map(response => response.people)) : this.getCharacters().pipe(map(characters => characters.map((character:any) => character.url)))
    ]).pipe(
      map(([characters, movieCharacters, speciesCharacters]) => {
        return characters.filter((character:any) => {
          const birthYear = parseInt(character.birth_year.replace(/BBY|ABY/g, ''), 10);
          return (!movie || movieCharacters.includes(character.url)) &&
                 (!species || speciesCharacters.includes(character.url)) &&
                 (!startYear || birthYear >= yearRange[0]) &&
                 (!endYear || birthYear <= yearRange[1]);
        });
      })
    );
  }
  getMovieCharacters(movieUrl: string): Observable<string[]> {
    return this.http.get<any>(movieUrl).pipe(map(response => response.characters));
  }

  getSpeciesCharacters(speciesUrl: string): Observable<string[]> {
    return this.http.get<any>(speciesUrl).pipe(map(response => response.people));
  }
}
