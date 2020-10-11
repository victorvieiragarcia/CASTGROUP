import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CursosService } from 'src/app/services/cursos.service';
import { MCursos } from '../../models/curso.model';
import { MCategoria } from '../../models/categoria.model';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers: [MessageService]
})
export class CursosComponent implements OnInit {
  msgToast = null;
  isSubmited = false;
  form: FormGroup;
  cursos: MCursos[];
  categorias: MCategoria[];
  cols = [
    { field: 'codigo', header: 'Código' },
    { field: 'descricao_do_assunto', header: 'Nome' }
  ];

  constructor(private cursosService: CursosService,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.getCursos();
    this.categoriaService.listAll().subscribe((categorias: MCategoria[]) => {
      this.categorias = categorias;
    });
    this.initForm();
  }

  private getCursos() {
    this.cursosService.listAll().subscribe((cursos: MCursos[]) => {
      this.cursos = cursos;
    });
  }

  private initForm() {
    this.form = this.formBuilder.group({
      codigo: new FormControl({
        value: null,
        disabled: true,
      }),
      descricao_do_assunto: new FormControl('',[Validators.required]),
      data_inicio: new FormControl(new Date(), [Validators.required]),
      data_termino: new FormControl(new Date(), [Validators.required]),
      quantidade_alunos_turma: new FormControl(0,[Validators.required]),
      codigo_categoria: new FormControl({codigo: 1, descricao: 'Comportamental'}, [Validators.required]),
    });
  }

  private setCodigoCategoria() {
    this.form.get('codigo_categoria').setValue({codigo: 1, descricao: 'Comportamental'});
  }

  salvar() {
    if (this.form.invalid) {
      this.isSubmited = true;
      return;
    }
    this.cursosService.salvar({...this.form.value, codigo_categoria:this.form.value['codigo_categoria'].codigo}).subscribe((reponse) => {
      this.cursos.push(reponse);
      this.limparDados();
     }, (error) =>{
       this.msgToast = error.error;
     });
     this.msgToast = null;
  }

  delete(curso) {
    this.cursosService.delete(curso.codigo).subscribe(() => {
      this.cursos = this.cursos.filter((element) => element.codigo !== curso.codigo);
      this.limparDados();
     });
  }

  editar() {
    if (this.form.invalid) {
      this.isSubmited = true;
      return;
    }
    this.cursosService.update(this.form.get('codigo').value, {...this.form.getRawValue(), codigo_categoria:this.form.value['codigo_categoria'].codigo}).subscribe((reponse) => {
      this.getCursos();
      this.limparDados();
     }, (error) =>{
      this.msgToast = error.error;
    });
    this.msgToast = null;
  }

  selectCurso(curso) {
    const categoria = this.categorias.filter((element) => element.codigo == curso.codigo_categoria);
    this.form.get('codigo').setValue(curso.codigo);
    this.form.get('descricao_do_assunto').setValue(curso.descricao_do_assunto);
    this.form.get('data_inicio').setValue(new Date(curso.data_inicio));
    this.form.get('data_termino').setValue(new Date(curso.data_termino));
    this.form.get('quantidade_alunos_turma').setValue(curso.quantidade_alunos_turma);
    this.form.get('codigo_categoria').setValue(categoria[0]);
  }

  limparDados() {
    this.form.reset();
      this.setCodigoCategoria();
  }
}
