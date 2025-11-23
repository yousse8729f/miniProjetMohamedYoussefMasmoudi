import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SiteArchitectural } from '../application/site-architectural';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MypipePipe } from '../application/mypipe-pipe';

@Component({
  selector: 'app-undestination',
  imports: [RouterLink, MypipePipe, RouterOutlet],
  templateUrl: './undestination.html',
  styleUrl: './undestination.css'
})
export class UNdestination {
  name = localStorage.getItem('name');
  @Input() c!:SiteArchitectural[]
  @Output () delete = new EventEmitter<string>()
   onDelete(id: string) {
    this.delete.emit(id);
  }

}
