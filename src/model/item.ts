export class Rituais {
    private id : number;
    private nome : string;
    private descricao : string;
    private peso : number;
    private passiva : string;

    constructor( id: number, nome: string, descricao : string, peso : number, passiva : string){
        this.id = id;            
        this.nome = nome;
        this.descricao = descricao;
        this.peso = peso;
        this.passiva = passiva;
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
    get getDescricao(): string{
        return this.descricao;
    }
    set setDescricao(descricao: string){
        this.descricao = descricao;
    }
    get getPeso(): number{
        return this.peso;
    }
    set setPeso(peso: number){
        this.peso = peso;
    }
    get getPassiva(): string{
        return this.passiva;
    }
    set setPassiva(passiva: string){
        this.passiva = passiva;
    }
}