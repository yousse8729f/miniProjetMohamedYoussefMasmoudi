import { Component, inject, OnInit } from '@angular/core';
import { Admin } from '../application/admin';
import { Architectural } from '../application/architectural';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.html',
  styleUrls: ['./new-pass.css'],
  imports: [FormsModule, ReactiveFormsModule],
})
export class NewPass implements OnInit {
  password: string | null = localStorage.getItem('password');
  name: string | null = localStorage.getItem('name');
  private ARC = inject(Architectural);
  private fb = inject(FormBuilder);
  private route = inject(Router);

  Form!: FormGroup;
  authAdmin: Admin[] = [];

  ngOnInit(): void {
    this.ARC.getAdmins().subscribe((res: Admin[]) => {
      this.authAdmin = res;
    });

    this.Form = this.fb.nonNullable.group({
      Nouvpass: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ChangePass() {
    if (this.Form.invalid) return;

    const updatedAdmin: Admin = {
      ...this.authAdmin[0], 
      password: this.Form.value.Nouvpass,
    };

    this.ARC.Updateadmin(updatedAdmin).subscribe(
      res=>{
        
            console.log('Password updated on server:', res);
            localStorage.setItem('password', this.Form.value.Nouvpass);
            this.route.navigate(['/']);
      }
     
    
  );
  }
  get passwordA() {
    return this.Form.get('Nouvpass');
  }

  Verif() {
    return this.passwordA?.touched && this.passwordA.invalid;
  }
}
