import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class Header implements OnInit {
 public name:string|null=null;
 public router :Router= inject(Router)
 private cdr = inject(ChangeDetectorRef);
 ngOnInit(): void {
   this.getName()
   
   
  }
  getName(){
    this.name = localStorage.getItem("name")
  }
  
  
  
  del(){
    
     localStorage.clear();
  this.router.navigate(['/']).then(() => {
    window.location.reload(); 
    this.cdr.detectChanges()
  });

  }
  

}
