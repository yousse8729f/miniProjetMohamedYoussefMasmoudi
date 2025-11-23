import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Architectural } from '../application/architectural';
import { SiteArchitectural } from '../application/site-architectural';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';

@Component({
  selector: 'app-new-arc',
  imports: [ReactiveFormsModule],
  templateUrl: './new-arc.html',
  styleUrl: './new-arc.css',
  standalone: true,
})
export class NewArc implements OnInit {
  private ARC: Architectural = inject(Architectural);
  list: SiteArchitectural[] = [];
  private router = inject(Router);
  private fb = inject(FormBuilder);
  FormARC!: FormGroup;
  private cdr = inject(ChangeDetectorRef);
  private name = localStorage.getItem('name');

  ngOnInit(): void {
    this.ARC.getarchitectural().subscribe((res) => {
      this.list = res;
    });
    this.FormARC = this.fb.nonNullable.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],

      photo: [
        '',
        [
          Validators.required,
        ],
      ],

      localisation: ['', [Validators.required]],

      dateConstruction: ['', Validators.required],

      prixEntree: ['', [Validators.required]],

      description: ['', [Validators.required]],
    });
  }
  submitted = false;
  Onajout() {
    this.submitted=true
    if (!this.name) {
      this.router.navigate(['/form']).then(() => {
        window.location.reload();
        this.cdr.detectChanges();
      });
    } else if (this.FormARC.valid) {
      const newItem: SiteArchitectural = {
        id: (this.list.length + 1).toString(),
        nom: this.FormARC.value.nom,
        photo: this.FormARC.value.photo,
        localisation: this.FormARC.value.localisation,
        dateConstruction: new Date(this.FormARC.value.dateConstruction), 
        prixEntree: this.FormARC.value.prixEntree,
        description: this.FormARC.value.description,
      };
      this.ARC.Addarchitectural(newItem).subscribe((res) => {
        this.list.push(res);
        this.router.navigate(['/destination']);
      });
    }
  }
}
