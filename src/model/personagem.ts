export default class Personagem {
    private id : number = 0;
    private nome : string = "";
    private jogador : string = "";
    private origem : string = "";
    private idade : number = 0;
    private sexo : string = "";
    private lnascimento : string = "";
    private lresidencia : string = "";
    private acao : number = 0;
    private reacao : number = 0;
    private movimento : number = 0;

    private peso :     Object = {id: 0, atual: 0, maximo: 0}
    private vida :     Object = {id: 0, atual: 0, maximo: 0}
    private sanidade : Object = {id: 0, atual: 0, maximo: 0}
    private ocutismo : Object = {id: 0, atual: 0, maximo: 0}
    private esforco :  Object = {id: 0, atual: 0, maximo: 0}

    private pericias :     Object[]  = [];
    private atributos :    Object[]  = [];
    private resistencias : Object[]  = [];
    private rituais :      Object[]  = [];
    private inventario :   Object[]  = [];

    constructor( id: number, nome: string, jogador: string, origem : string, idade : number,
                 sexo : string, lnascimento : string, lresidencia : string, acao : number,
                 reacao : number, movimento : number, peso : Object, vida : Object,
                 sanidade : Object, ocutismo : Object, esforco : Object, pericias : Object[],
                 atributos : Object[], resistencias : Object[], rituais : Object[], inventario : Object[]
                ){
        this.id = id;
        this.nome = nome;
        this.jogador = jogador;
        this.origem = origem;
        this.idade = idade;
        this.sexo = sexo;
        this.lnascimento = lnascimento;
        this.lresidencia = lresidencia;
        this.acao = acao;
        this.reacao = reacao;
        this.movimento = movimento;
        this.peso = peso;
        this.pericias = pericias;
        this.vida = vida;
        this.sanidade = sanidade;
        this.ocutismo = ocutismo;
        this.esforco = esforco;
        this.atributos = atributos;
        this.resistencias = resistencias;
        this.rituais = rituais;
        this.inventario = inventario;
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
    get getJogador(): string{
        return this.jogador;
    }
    set setJogador(jogador: string){
        this.jogador = jogador;
    }
    get getOrigem(): string{
        return this.origem;
    }
    set setOrigem(origem: string){
        this.origem = origem;
    }
    get getIdade(): number{
        return this.idade;
    }
    set setIdade(idade: number){
        this.idade = idade;
    }
    get getSexo(): string{
        return this.sexo;
    }
    set setSexo(sexo: string){
        this.sexo = sexo;
    }
    get getLnascimento(): string{
        return this.lnascimento;
    }
    set setLnascimento(lnascimento: string){
        this.lnascimento = lnascimento;
    }
    get getLresidencia(): string{
        return this.lresidencia;
    }
    set setLresidencia(lresidencia: string){
        this.lresidencia = lresidencia;
    }
    get getAcao(): number{
        return this.acao;
    }
    set setAcao(acao: number){
        this.acao = acao;
    }
    get getReacao(): number{
        return this.reacao;
    }
    set setReacao(reacao: number){
        this.reacao = reacao;
    }
    get getMovimento(): number{
        return this.movimento;
    }
    set setMovimento(movimento: number){
        this.movimento = movimento;
    }
    get getPeso(): Object{
        return this.peso;
    }
    set setPeso(peso: Object){
        this.peso = peso;
    }
    get getVida(): Object{
        return this.vida;
    }
    set setVida(vida: Object){
        this.vida = vida;
    }
    get getSanidade(): Object{
        return this.sanidade;
    }
    set setSanidade(sanidade: Object){
        this.sanidade = sanidade;
    }
    get getOcutismo(): Object{
        return this.ocutismo;
    }
    set setOcutismo(ocutismo: Object){
        this.ocutismo = ocutismo;
    }
    get getEsforco(): Object{
        return this.esforco;
    }
    set setEsforco(esforco: Object){
        this.esforco = esforco;
    }
    get getPericias(): Object[]{
        return this.pericias;
    }
    set setPericias(pericias: Object[]){
        this.pericias = pericias;
    }
    get getAtributos(): Object[]{
        return this.atributos;
    }
    set setAtributos(atributos: Object[]){
        this.atributos = atributos;
    }
    get getResistencias(): Object[]{
        return this.resistencias;
    }
    set setResistencias(resistencias: Object[]){
        this.resistencias = resistencias;
    }
    get getRituais(): Object[]{
        return this.rituais;
    }
    set setRituais(rituais: Object[]){
        this.rituais = rituais;
    }
    get getInventario(): Object[]{
        return this.inventario;
    }
    set setInventario(inventario: Object[]){
        this.inventario = inventario;
    }

}
let matheus: Personagem = new Personagem(
    1,
    'matheus',
    'jhin',
    'bombeiro',
    21,
    'm',
    'belford roxo',
    'manaus',
    5, 5, 5, {atual:5, maximo:17},
    {atual:10, maximo:16},
    {atual:64, maximo:75},
    {atual:15, maximo:15},
    {atual:7, maximo:12},
    [{id : 1, nome: "Atletismo", valor: 15 },
     {id : 2, nome: "Atualidades", valor: 11 },
     {id : 3, nome: "Ciência", valor: 6 },
     {id : 4, nome: "Diplomacia", valor: 7 }],
     [{id:1, nome: 'FORÇA', valor: 5}],
     [
        {id:1, nome: 'FÍSICA', valor: 2},
        {id:2, nome: 'BALÍSTICA', valor: 3},
        {id:3, nome: 'INSANIDADE', valor: 2},
        {id:4, nome: 'MEDO', valor: 9},
        {id:5, nome: 'SANGUE', valor: 5},
        {id:6, nome: 'MORTE', valor: 6},
        {id:6, nome: 'ENERGIA', valor: 7},
        {id:6, nome: 'CONHECIMEN', valor: 2},
    ],
    [],
    [],
);
//console.log('meu personagem: ', matheus)