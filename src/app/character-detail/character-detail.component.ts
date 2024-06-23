import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../swapi.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: any;
  species: any;
  movies: string[] = [];
  starships: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private swapiService: SwapiService,
    public router:Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.swapiService.getCharacter(Number(id)).subscribe(character => {
      this.character = character;

      this.swapiService.getSpecies().subscribe(species => {
        this.species = species.find((specie: any) => character.species.includes(specie.url));
      });

      this.swapiService.getMovies().subscribe(movies => {
        this.movies = movies.filter((movie: any) => character.films.includes(movie.url)).map((movie: any) => movie.title);
      });

      if (character.starships.length > 0) {
        character.starships.forEach((url: string) => {
          this.swapiService.getStarship(url).subscribe(starship => {
            this.starships.push(starship.name);
          });
        });
      }
    });
  }

  backtohome(){
    this.router.navigate(['/characters']);

  }
}
