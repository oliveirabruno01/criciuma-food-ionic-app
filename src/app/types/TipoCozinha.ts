export class TipoCozinha {
    id: number;
    name: string;
    descricao: string;
    origin: string;
    samples: string;

    public TipoCozinha(){
        this.name, this.descricao, this.origin, this.samples = '';
    }
}