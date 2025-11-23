import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from './admin';
import { SiteArchitectural } from './site-architectural';

const api_url = 'http://localhost:3001/architectural';
const api = 'http://localhost:3000/admin';
const apiKey = '50ffc0621c5d4aefb408d97ccc2d5705';
const baseUrl = 'http://api.weatherbit.io/v2.0/current';

@Injectable({
  providedIn: 'root',
})
export class Architectural {
  private httpC: HttpClient = inject(HttpClient);

  public getarchitectural(): Observable<SiteArchitectural[]> {
    return this.httpC.get<SiteArchitectural[]>(api_url);
  }
  public getWeather(lat: number, lon: number): Observable<any> {
    return this.httpC.get<any>(`${baseUrl}?lat=${lat}&lon=${lon}&key=${apiKey}`);
  }
  public getarchitecturalByID(id: string): Observable<SiteArchitectural> {
    return this.httpC.get<SiteArchitectural>(`${api_url}/${id}`);
  }
  public Addarchitectural(A: SiteArchitectural): Observable<SiteArchitectural> {
    return this.httpC.post<SiteArchitectural>(api_url, A);
  }
  public Deletearchitectural(id: string): Observable<any> {
    return this.httpC.delete(api_url + '/' + id);
  }
  public Updatearchitectural(id: string, A: SiteArchitectural): Observable<any> {
    return this.httpC.patch(`${api_url}/${id}`, A);
  }
  public Updateadmin(A: Admin): Observable<any> {
    return this.httpC.patch(`${api}/1`, { password: A.password });
  }
  public getAdmins(): Observable<Admin[]> {
    return this.httpC.get<Admin[]>(api);
  }
}
