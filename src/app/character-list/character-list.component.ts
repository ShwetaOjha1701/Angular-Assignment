import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../swapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  hoverRow: any = null; // Track hovered row

  constructor(private swapiService: SwapiService, private router: Router) {}

  ngOnInit(): void {
    this.swapiService.getCharacters().subscribe(characters => {
      this.characters = characters;
      this.filteredCharacters = characters;
    });
    console.log(this.filteredCharacters)
  }

  applyFilters(filters: any) {
    this.filteredCharacters = this.characters.filter(character => {
      return (!filters.movie || character.films.includes(filters.movie.url)) &&
             (!filters.species || character.species.includes(filters.species.url)) &&
             (!filters.birthYearFrom || parseInt(character.birth_year) >= filters.birthYearFrom) &&
             (!filters.birthYearTo || parseInt(character.birth_year) <= filters.birthYearTo);
    });
  }

  selectCharacter(character: any): void {
    console.log(character, "okkk");
    console.log(['/characters', character.url.split('/').slice(-2, -1)[0]], "kkklll");
    this.router.navigate(['/characters', character.url.split('/').slice(-2, -1)[0]]);
  }
  backtohome(){
    this.router.navigate(['/dashboard']);

  }
}
