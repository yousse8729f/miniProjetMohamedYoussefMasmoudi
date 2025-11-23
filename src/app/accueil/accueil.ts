import { Component } from '@angular/core';
import { Section } from "../components/section/section";
import { SectionPart2 } from "../components/section-part2/section-part2";
import { Middle } from "../components/middle/middle";

@Component({
  selector: 'app-accueil',
  imports: [Section, SectionPart2, Middle],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {

}
