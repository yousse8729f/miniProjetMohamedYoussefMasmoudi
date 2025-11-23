import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { Destinations } from './destinations/destinations';
import { Propos } from './propos/propos';
import { Erreur } from './erreur/erreur';
import { FormC } from './form/form';
import { Place } from './place/place';
import { NewArc } from './new-arc/new-arc';
import { Commentair } from './components/commentair/commentair';
import { PlaceMap } from './place-map/place-map';
import { NewPass } from './new-pass/new-pass';
import { DestinationParent } from './destination-parent/destination-parent';

export const routes: Routes = [
  { path: 'acceuil', title: 'acceuil', component: Accueil },
 {
  path: 'destination',
  title: 'destination',
  component: DestinationParent,   
  children: [
    {
       path: '',
  title: 'destination',
  component: Destinations,
    }
    ,
    {
      path: 'place/:id',
      title: 'place',
      component: Place
    },
    {
      path: 'place-weather/:id',
      title: 'place-map',
      component: PlaceMap
    },
    {
      path: 'commentaire/:id',
      title: 'commentaire',
      component: Commentair
    }
  ]
},

  { path: 'admins/:id', title: 'admin', component: NewPass },
  { path: 'nouveauPlace', title: 'nouveauPlace', component: NewArc },
  { path: 'propos', title: 'propos', component: Propos },
  { path: 'form', title: 'form', component: FormC },
  { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
  { path: '**', title: 'erreur', component: Erreur },
];
