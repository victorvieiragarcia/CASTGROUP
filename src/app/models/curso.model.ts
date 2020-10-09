export class MCursos {
  codigo?: number;
  descricaoDoAssunto?: string;
  dataInicio?: Date;
  dataTermino?: Date;
  quantidadeAlunosPorTurma?: number;
  categoria?: number;
  constructor(data?: MCursos) {
    if (data) {
      Object.keys(data).forEach((f) => {
        this[f] = data[f];
      });
    }
  }
}
