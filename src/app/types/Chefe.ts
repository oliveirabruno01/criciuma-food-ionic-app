export class Chefe {
    id: number;
    name: string;
    descricao: string;
    anosExperiencia: number;
    documentoGeral: string;

    public Chefe(id, anos_experiencia: number, name, descr, documento_geral: string) {
        this.id = id;
        this.name = name;
        this.descricao = descr;
        this.anosExperiencia = anos_experiencia;
        this.documentoGeral = documento_geral;
    }
}