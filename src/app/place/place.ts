import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Architectural } from '../application/architectural';
import { SiteArchitectural } from '../application/site-architectural';
FormsModule;
@Component({
  selector: 'app-place',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './place.html',
  styleUrl: './place.css',
})
export class Place implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ARC = inject(Architectural);
  private cdr = inject(ChangeDetectorRef);
  name = localStorage.getItem('name');

  place: SiteArchitectural = {
    id: '',
    nom: '',
    prixEntree: 0,
    photo: '',
    localisation: '',
    dateConstruction:new Date(),
    description: '',
    commentaires: [],
  };
  

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ARC.getarchitecturalByID(id).subscribe((res) => {
        this.place = {
          ...res,
          dateConstruction: new Date(res.dateConstruction) ,
          prixEntree: Number(res.prixEntree) || 0,
          description: res.description || '',
        };
        this.cdr.detectChanges();
      });
    }
    console.log(this.place);
  }
  get dateString(): string {
    if (!this.place.dateConstruction) return '';
    const d = this.place.dateConstruction;
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }
  set dateString(value: string) {
    this.place.dateConstruction = value ? new Date(value) : new Date();
  }

  updatePlace() {
    if (!this.name) {
      this.router.navigate(['/form']).then(() => {
        window.location.reload();
        this.cdr.detectChanges();
      });
    } else if (this.place.id) {
      this.ARC.Updatearchitectural(this.place.id, this.place).subscribe(
        () => {
          alert('✅ Place mise à jour avec succès !');
          this.router.navigate(['/destination']);
        },
       
      );
    }
  }

  onCancel() {
    this.router.navigate(['/destination']);
  }
}
