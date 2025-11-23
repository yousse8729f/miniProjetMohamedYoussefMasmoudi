import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Architectural } from '../application/architectural';
import { Router } from '@angular/router';
import { Admin } from '../application/admin';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class FormC implements OnInit {
  authAdmin: Admin[] = []; 

  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  Form!: FormGroup;
  private ARC = inject(Architectural);
  private router = inject(Router);

  ngOnInit(): void {
  
    this.ARC.getAdmins().subscribe((res) => {
      this.authAdmin = res;
      this.cdr.detectChanges();
    });

    // Create Form
    this.Form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSumbit() {
    if (this.Form.invalid) return;

    const formName = this.Form.value.name;
    const formPassword = this.Form.value.password;

    localStorage.setItem('name', formName);
    localStorage.setItem('password', formPassword);

    const Admin = this.authAdmin.find((x) => x.name === formName && x.password == formPassword);

    if (Admin) {
      this.router.navigate(['/']).then(() => window.location.reload());
    } else {
      alert('Admin does not exist');
    }
  }

  onRset() {
    this.Form.reset();
  }

  get passwordA() {
    return this.Form.get('password');
  }

  get nameAdmin() {
    return this.Form.get('name');
  }

  verifname() {
    return this.nameAdmin?.invalid && this.nameAdmin.touched;
  }

  verifpassword() {
    return this.passwordA?.invalid && this.passwordA.touched;
  }
}
