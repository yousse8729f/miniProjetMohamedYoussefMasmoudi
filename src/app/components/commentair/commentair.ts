import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Architectural } from '../../application/architectural';
import { SiteArchitectural } from '../../application/site-architectural';
import { Commentaire } from '../../application/commentaire';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-commentair',
  imports: [ReactiveFormsModule],
  templateUrl: './commentair.html',
  styleUrl: './commentair.css',
})
export class Commentair {
  private route = inject(ActivatedRoute);
  public Form!: FormGroup;
  private FB: FormBuilder = inject(FormBuilder);

  private ARC = inject(Architectural);
  private cdr = inject(ChangeDetectorRef);

  place: SiteArchitectural = {
    id: '',
    nom: '',
    prixEntree: 0,
    photo: '',
    localisation: '',
    dateConstruction: new Date(),
    description: '',
    commentaires:[]
  };

  ngOnInit(): void {
    this.Form = this.FB.nonNullable.group({
      commentaires: this.FB.array([]),
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ARC.getarchitecturalByID(id).subscribe((res) => {
        this.place = {
          ...res,
          commentaires: res.commentaires || [] 
        };

        this.cdr.detectChanges();
      });
    }
  }
  get getcommentaires() {
    return this.Form.get('commentaires') as FormArray;
  }
  addComent() {
    const commentGroup = this.FB.group({
      nom: ['', [Validators.required, Validators.minLength(4)]],
      message: ['', [Validators.required, Validators.minLength(4)]],
    });
    this.getcommentaires.push(commentGroup);
  }

  submitted = false;
  AddCOM() {
    this.submitted = true;
    if (!this.Form.valid) return;
    const allComments = [...(this.place.commentaires || []), ...this.getcommentaires.value];

    if (this.place.id) {
      this.place = { ...this.place, commentaires: allComments };

      this.ARC.Updatearchitectural(this.place.id, this.place).subscribe(
        () => {
          this.cdr.detectChanges();

          alert('✅ Place mise à jour avec succès !');
        },
      
      );
    }
  }
}
