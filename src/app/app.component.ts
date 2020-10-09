import { Component } from '@angular/core';
export interface Aluno {
  nome: string;
  nota: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent   {


  constructor() { }

}
