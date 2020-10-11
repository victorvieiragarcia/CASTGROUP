export class MCursos {
  codigo?: number;
  descricao_do_assunto?: string;
  data_inicio?: Date;
  data_termino?: Date;
  quantidade_alunos_turma?: number;
  codigo_categoria?: number;
  constructor(data?: MCursos) {
    if (data) {
      Object.keys(data).forEach((f) => {
        this[f] = data[f];
      });
    }
  }
}
