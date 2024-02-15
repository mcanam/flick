import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
      providedIn: 'root'
})
export class MovieService {
      API_URL = environment.API_URL;

      constructor(private http: HttpClient) { }

      search(title: string) {
            const url = this.API_URL + 'movie/search/' + title;
            return this.http.get(url).pipe(map((response: any) => response.data));
      }

      discover() {
            const url = this.API_URL + 'movie/discover';
            return this.http.get(url).pipe(map((response: any) => response.data));
      }

      watch(id: string) {
            const url = this.API_URL + 'movie/watch/' + id;
            return this.http.get(url).pipe(map((response: any) => response.data));
      }
}
