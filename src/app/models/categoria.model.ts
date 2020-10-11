export class MCategoria {
  codigo?: number;
  descricao?: string;
  constructor(data?: MCategoria) {
    if (data) {
      Object.keys(data).forEach((f) => {
        this[f] = data[f];
      });
    }
  }
}
