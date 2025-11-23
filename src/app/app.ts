import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Place } from './place/place';
import { NewArc } from "./new-arc/new-arc";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header,  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Projet_Mohamed_Youssef_Masmoudi');
}
