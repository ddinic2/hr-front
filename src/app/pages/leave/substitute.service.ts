import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubstituteService {
  data;

  constructor(private http: HttpClient) {
    this.getSubstitutes('');
  }

  getSubstitutes(val: string): Observable<any[]> {
    const options = {params: new HttpParams().set('like', val)};
    return this.http.get<any[]>(
      environment.db.ROOT + environment.db.SUBSTITUTE,
      options
    );
  }
}
