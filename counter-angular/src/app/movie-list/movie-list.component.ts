import { Component, OnInit } from '@angular/core';
import { Movie, MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  isLoading: boolean = true;
  movies: Movie[];
  errorMessage: string;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  getMovies() {
      this.movieService
          .getMovies()
          .subscribe(
              movies => {
                  this.movies = movies;
                  this.isLoading = false;
              },
              error => this.errorMessage = <any>error
          );
    }

    findMovie(id): Movie {
        return this.movies.find(movie => movie.id === id);
    }

    isUpdating(id): boolean {
        return this.findMovie(id).isUpdating;
    }

    increaseCount(id) {
        let movie = this.findMovie(id);
        movie.isUpdating = true;
        this.movieService
            .increaseCount(id)
            .subscribe(
                response => {
                    movie.count = response.count;
                    movie.isUpdating = false;
                },
                error => {
                    this.errorMessage = <any>error;
                    movie.isUpdating = false;
                }
            );
    }

    appendMovie(movie: Movie) {
        this.movies.push(movie);
    }

}
