import { ChangeDetectorRef, Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Architectural } from '../application/architectural';
import { SiteArchitectural } from '../application/site-architectural';
import { SunPipe } from '../application/sun-pipe';
import { TempPipe } from '../application/temp-pipe';
import { DatePipe, JsonPipe } from '@angular/common';
import { MypipePipe } from '../application/mypipe-pipe';

@Component({
  selector: 'app-place-map',
  imports: [SunPipe, TempPipe,DatePipe,MypipePipe],
  templateUrl: './place-map.html',
  styleUrl: './place-map.css',
  standalone:true
})
export class PlaceMap implements OnInit {
  place!: SiteArchitectural;
  private route = inject(ActivatedRoute);
  private ARC = inject(Architectural);
  private cdr = inject(ChangeDetectorRef);
  weather!: any;
  public dataplace: any = {
  cityname: '',
  sunrise: '',
  sunset: '',
  temp: ''
};
  lat!: number;
  lng!: number;

 ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (!id) return;

  this.ARC.getarchitecturalByID(id).subscribe((res) => {
    this.place = res;
    this.cdr.detectChanges()

    const coords = this.extractLatLng(res.localisation);
    if (!coords) return;

    this.lat = coords[0];
    this.lng = coords[1];

    this.ARC.getWeather(this.lat, this.lng).subscribe((res) => {
      this.weather = res;
        this.cdr.detectChanges()
        
        const w = this.weather.data[0];
        this.dataplace = {
          cityname: w.city_name, 
          sunrise:( w.sunrise),
          sunset: (w.sunset),
          temp: w.temp,
        };
        this.cdr.detectChanges()
    });
  });
}


  private extractLatLng(url: string): [number, number] | null {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+),/;
    const match = url.match(regex);
    if (match) return [parseFloat(match[1]), parseFloat(match[2])];
    console.log('Coordinates not found in URL');
    return null;
  }
}
