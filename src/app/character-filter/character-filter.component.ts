import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SwapiService } from '../swapi.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-character-filter',
  templateUrl: './character-filter.component.html',
  styleUrls: ['./character-filter.component.css']
})
export class CharacterFilterComponent implements OnInit {
  filterForm: FormGroup;
  movies: any[] = [];
  speciesList: any[] = [];

  @Output() filtersChanged = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private swapiService: SwapiService,public router:Router
  ) {
    this.filterForm = this.fb.group({
      movie: [''],
      species: [''],
      startYear: [''],
      endYear: ['']
    });
  }

  ngOnInit(): void {
    // this.swapiService.getMovies().subscribe(movies => {
    //   this.movies = movies;
    // });

    // this.swapiService.getSpecies().subscribe(species => {
    //   this.speciesList = species;
    // });
    forkJoin([
      this.swapiService.getMovies(),
      this.swapiService.getSpecies(),
      this.swapiService.getCharacters()
    ]).subscribe(([movies, species, characters]) => {
      this.movies = movies;
      this.speciesList = species;
      this.characters = characters;
    });
  }

  applyFilters(): void {
    const filters = this.filterForm.value;
    console.log(filters, "character-filter");
    this.filtersChanged.emit(filters);
  }

  // getdata(): void {
  //   const filters = this.filterForm.value;
  //   console.log(filters, "character-filter");

  //   this.swapiService.getCharactersByFilters(filters).subscribe(filteredCharacters => {
  //     this.filtersChanged.emit(filteredCharacters);
  //   });
  //   console.log(this.filtersChanged);
    
  // }
  characters:any=[]
  displyfilterchardata:any=[]
  getdata(): void {
    const filters = this.filterForm.value;
    const { movie, species, startYear, endYear } = this.filterForm.value as {
      movie: any,
      species: any,
      startYear: string,
      endYear: string
    };
    let filteredCharacters = this.characters;

    if (movie) {
      this.swapiService.getMovieCharacters(movie).subscribe(movieCharacters => {
        filteredCharacters = filteredCharacters.filter((character:any) => movieCharacters.includes(character.url));
        this.applyOtherFilters(filteredCharacters, species, startYear, endYear);
      });
      
      
    } else {
      this.applyOtherFilters(filteredCharacters, species, startYear, endYear);
    }
  }

  applyOtherFilters(filteredCharacters: any[], species: any, startYear: string, endYear: string) {
    if (species) {
      this.swapiService.getSpeciesCharacters(species).subscribe(speciesCharacters => {
        filteredCharacters = filteredCharacters.filter(character => speciesCharacters.includes(character.url));
      });
      this.applyYearFilter(filteredCharacters, startYear, endYear);
      this.displyfilterchardata=[]
     
      this.displyfilterchardata=  filteredCharacters
    } else {
      this.applyYearFilter(filteredCharacters, startYear, endYear);
    }
  }

  applyYearFilter(filteredCharacters: any[], startYear: string, endYear: string) {
    if (startYear || endYear) {
      filteredCharacters = filteredCharacters.filter(character => {
        const birthYear = parseInt(character.birth_year.replace(/BBY|ABY/g, ''), 10);
        return (!startYear || birthYear >= parseInt(startYear, 10)) &&
               (!endYear || birthYear <= parseInt(endYear, 10));
      });
    }
    this.displyfilterchardata=[]
    this.displyfilterchardata = filteredCharacters
   
    this.filtersChanged.emit(filteredCharacters);
  }
  backtohome(){
    this.router.navigate(['/dashboard']);

  }
}
