export class Rituais {
    private id : number = 0;
    private nome : string = "";
    private img : string = "";
    private descricao : string = "";
    private elementos : string[] = [];
    private efeito : string = "";
    private alcance : number = 0;
    private requisitos : string[] = [];
    private custoS : string = ''
    private custoO : number = 0;
    private efeitoPassivo : string = "";

    constructor( id: number, nome: string, img: string, descricao : string, elementos : string[], efeito : string, 
                alcance : number, requisitos : string[], custoS : string, custoO : number, efeitoPassivo : string){
        this.id = id;            
        this.nome = nome;
        this.img = img;
        this.descricao = descricao;
        this.elementos = elementos;
        this.efeito = efeito;
        this.alcance = alcance;
        this.requisitos = requisitos;
        this.custoS = custoS;
        this.custoO = custoO;
        this.efeitoPassivo = efeitoPassivo;
    }
    get getid(): number{
        return this.id;
    }
    set setid(id: number){
        this.id = id;
    }
    get getNome(): string{
        return this.nome;
    }
    set setNome(nome: string){
        this.nome = nome;
    }
    get getImg(): string{
        return this.img;
    }
    set setImg(img: string){
        this.img = img;
    }
    get getDescricao(): string{
        return this.descricao;
    }
    set setDescricao(descricao: string){
        this.descricao = descricao;
    }
    get getElementose(): string[]{
        return this.elementos;
    }
    set setElementos(elementos: string[]){
        this.elementos = elementos;
    }
    get getEfeito(): string{
        return this.efeito;
    }
    set setEfeito(efeito: string){
        this.efeito = efeito;
    }
    get getAlcance(): number{
        return this.alcance;
    }
    set setAlcance(alcance: number){
        this.alcance = alcance;
    }
    get getRequisitos(): string[]{
        return this.requisitos;
    }
    set setRequisitos(requisitos: string[]){
        this.requisitos = requisitos;
    }
    get getCustoS(): string{
        return this.custoS;
    }
    set setCustoS(custoS: string){
        this.custoS = custoS;
    }
    get getCustoO(): number{
        return this.custoO;
    }
    set setCustoO(custoO: number){
        this.custoO = custoO;
    }
    get getEfeitoPassivo(): string{
        return this.efeitoPassivo;
    }
    set setEfeitoPassivo(efeitoPassivo: string){
        this.efeitoPassivo = efeitoPassivo;
    }
}