import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Architectural } from '../application/architectural';
import { Router, RouterLink } from '@angular/router';
import { SiteArchitectural } from '../application/site-architectural';
import { UNdestination } from "../undestination/undestination";

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [RouterLink, UNdestination],
  templateUrl: './destinations.html',
  styleUrl: './destinations.css',
})
export class Destinations implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private ARC = inject(Architectural);
  private router = inject(Router);
  list: SiteArchitectural[] = [];
   name = localStorage.getItem('name');
 

  ngOnInit(): void {
    this.loadArchitecturalList();
    
      
  }

  private loadArchitecturalList(): void {
    this.ARC.getarchitectural().subscribe({
      next: (res) => {
        this.list = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  Supp(id: string): void {
    if (!(this.name )) {
      this.router.navigate(['/form']).then(() => {
        window.location.reload();
        this.cdr.detectChanges();
      });
    } else if (confirm('Êtes-vous sûr de vouloir supprimer cette place ?')) {
      this.ARC.Deletearchitectural(id).subscribe({
        next: () => {
          this.list = this.list.filter((item) => item.id !== id);
          this.cdr.detectChanges();
          console.log(`Deleted item with id ${id}`);
        },
        error: (err) => console.error('Error deleting:', err),
      });
    }
  }
  arr: SiteArchitectural[] = [];
  Cherche(text: string) {
   
      this.arr = this.list.filter((x) => x.nom.toLowerCase().includes(text.toLowerCase()));
      console.log('enter');
    
    return this.arr;
  }
}
