export class Restaurante {
    id: number;
    name: string;
    district: string;
    address: string;
    idCozinhaTipo: number;
    idChefe: number;

    public Restaurante(){
        this.name = '';
        this.district = '';
        this.address = '';
        this.idCozinhaTipo = 0;
        this.idChefe = 0;
    }
}