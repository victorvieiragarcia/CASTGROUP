import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/services/cursos.service';
import { MCursos } from '../../models/curso.model';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: MCursos[];
  teste: [{nome:'victor'}, {nome:'vieira'}];
  constructor(private cursosService: CursosService) { }

  ngOnInit() {
    this.cursosService.listAll().subscribe((cursos: MCursos[]) => {
      this.cursos = cursos;
    });
    console.log(this.cursos);
  }

}
