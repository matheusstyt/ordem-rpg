<template>
    <div id="caixa-form-detalhes">
        <form @submit="verificar($event)" class="formDetalhes" action="">

                        <h2>DETALHES PESSOAIS</h2>

                        <div class="caixa-input">
                            <label for="jogador">Nome do Personagem</label>
                            <div>
                                <input class="input-padrao0" type="text" name="jogador" id="id-jogador alerta" v-model="localJogador" spellcheck="false" :style="alertaJogador">
                            </div>
                        </div>
                        <div class="caixa-input">
                            <label for="ocupacao">Origem</label>
                            <div>
                                <select v-model="localOrigem" size="1" class="input-padrao0" >
                                    <option v-for="origem in origens" :key="origem.id" :value="origem.origem">{{origem.origem}}</option>

                                </select>
                            </div>
                        </div>
                        <div class="caixa-input">
                            <label for="classe">Classe</label>
                            <div>
                                <select v-model="localClasse" size="1" class="input-padrao0" >
                                    <option value="COMBATENTE">COMBATENTE</option>
                                    <option value="OCULTISTA">OCULTISTA</option>
                                    <option value="INTELECTUAL">INTELECTUAL</option>
                                </select>
                            </div>
                        </div>
                        <div class="caixa-input">
                            <div>
                                <label for="classe">Nível de Exposição Paranormal(NEX)</label>
                                <div>
                                    <input  class="input-padrao0" type="number" v-model="localNEX">

                                </div>
                            </div>
                            <div>
                                <label for="classe">Trilha (são necessários 10% de NEX)</label>
                                <div>
                                    <select v-model="localTrilha" v-if="localNEX < 10" size="1" class="input-padrao0" >
                                        <option value="Sem Patente">Sem Patente</option>
                                    </select>
                                    <select v-else-if="localNEX >= 10 && localClasse === 'COMBATENTE'" v-model="localTrilha" size="1" class="input-padrao0" >
                                        <option value="Sem Patente">Sem Patente</option>
                                        <option v-for="(trilhac, index) in trilhasC" :key="index" value="trilhac.trilha">{{trilhac.trilha}}</option>
                                    </select>
                                    <select v-else-if="localNEX >= 10 && localClasse === 'INTELECTUAL'" v-model="localTrilha" size="1" class="input-padrao0" >
                                        <option value="Sem Patente">Sem Patente</option>
                                        <option v-for="(trilhae, index) in trilhasI" :key="index" :value="trilhae.trilha">{{trilhae.trilha}}</option>
                                    </select>
                                    <select v-model="localTrilha" v-else-if="localNEX >= 10 && localClasse === 'OCULTISTA'"  size="1" class="input-padrao0" >
                                        <option value="Sem Patente">Sem Patente</option>
                                        <option v-for="(trilhao, index) in trilhasO" :key="index" :value="trilhao.trilha">{{trilhao.trilha}}</option>
                                    </select>

                                </div>
                            </div>
                            
                        </div>
                        <div class="caixa-input">
                            <label for="classe">Patente</label>
                            <div>
                                <select v-model="localPatente" size="1" class="input-padrao0" >
                                    <option value="Sem Patente">Sem Patente</option>
                                    <option value="Recruta">Recruta</option>
                                    <option value="Operador">Operador</option>
                                    <option value="Agente Especial">Agente Especial</option>
                                    <option value="Oficial de Operações">Oficial de Operações</option>
                                    <option value="Agente de Elite">Agente de Elite</option>
                                </select>
                            </div>
                        </div>
                        <div class="caixa-input">
                            <label for="idade">Idade</label>
                            <div>
                                <input class="input-padrao0" type="number" name="idade" id="id-idade" v-model="localIdade" :style="alertaIdade">
                            </div>
                        </div>
                        <div class="caixa-input">
                            <label for="sexo">Sexo</label>
                            <div>
                                <input class="input-padrao0" type="text" name="sexo" id="id-sexo" v-model="localSexo" :style="alertaSexo">
                            </div>
                        </div>
                        <div class="caixa-input">
                            <label for="lnascimento">Local de nascimento</label>
                            <div>
                                <input class="input-padrao0" type="text" name="lnascimento" id="id-lnascimento" v-model="localLnascimento" :style="alertaLN">
                            </div>

                        </div>
                        <div class="caixa-input">
                            <label for="lresidencia">Local de residência</label>
                            <div>
                                <input class="input-padrao0" type="text" name="lresidencia" id="id-lresidencia" v-model="localLresidencia" :style="alertaLR">
                            </div>
                        </div>
            </form>
    </div>
</template>

<script>
export default {
    props:{
        nome : String,
        jogador : String,
        origem : String,
        classe : String,
        idade : Number,
        sexo : String,
        lnascimento : String,
        lresidencia : String,
        trilha : String,
        NEX : Number,
        patente : String
    },
    methods:{
        teste(){
            console.log('testando :', this.localNome)
        },
        verificar(e){
            e.preventDefault();

            // if(this.localNome == ''){
            //     this.alertaNome = 'text-transform:uppercase; border-bottom: 2px solid #e65656;'
            //     console.log('AAAAAAAAAAAAAAA')
            // }
            // if(this.document.getElementById('id-nome').value != ''){
            //     this.alertaNome = 'text-transform:uppercase; border-bottom: 2px solid #a2a2a2;'
            //      console.log('BBBBBBBBBBB')
            // }
           // this.localJogador = document.getElementById('id-jogador').value
           // this.localOrigem = document.getElementById('id-origem').value
           // this.localIdade = document.getElementById('id-idade').value
          //  this.localSexo =document.getElementById('id-sexo').value
           // this.localLnascimento = document.getElementById('id-lnascimento').value
           // this.localLresidencia = document.getElementById('id-lresidencia').value

           // SalvarDetalhes()

        },
        SalvarDetalhes(){

            if(this.localNome == ''){
                this.alertaNome = 'text-transform:uppercase; border-bottom: 2px solid #e65656;'
            }else{
                this.alertaNome = 'text-transform:uppercase; border-bottom: 2px solid #a2a2a2;'

            }
            if(this.localJogador == ''){
                this.alertaJogador = 'text-transform:uppercase; border-bottom: 2px solid #e65656;'
            }else{
                this.alertaJogador = 'text-transform:uppercase; border-bottom: 2px solid #a2a2a2;'
            }
            if(this.localOrigem == ''){
                this.alertaOrigem = 'text-transform:uppercase; border-bottom: 2px solid #e65656;'
            }else{
                this.alertaOrigem = 'text-transform:uppercase; border-bottom: 2px solid #a2a2a2;'
            }
            if(this.localSexo == ''){
                this.alertaSexo = 'text-transform:uppercase; border-bottom: 2px solid #e65656;'
            }else{
                this.alertaSexo = 'text-transform:uppercase; border-bottom: 2px solid #a2a2a2;'
            }if(this.localIdade < 1 || this.localIdade >= 90){
                this.alertaIdade = 'text-transform:uppercase; border-bottom: 2px solid #e65656;'
            }else{
                this.alertaIdade = 'text-transform:uppercase; border-bottom: 2px solid #a2a2a2;'

            } if(this.localLnascimento == ''){
                this.alertaLN = 'text-transform:uppercase; border-bottom: 2px solid #e65656;'
            }else{
                this.alertaLN = 'text-transform:uppercase; border-bottom: 2px solid #a2a2a2;'

            }if(this.localLresidencia == ''){
                this.alertaLR = 'text-transform:uppercase; border-bottom: 2px solid #e65656;'
            }else{
                this.alertaLR = 'text-transform:uppercase; border-bottom: 2px solid #a2a2a2;'
            }

        },
    },
    data(){
        return{
            localNEX:0,
            localPatente: '',
            localTrilha: '',
            trilhasC:[
                {classe: 'COMBATENTE', trilha: 'Aniquilador'},
                {classe: 'COMBATENTE', trilha: 'Comandante de Campo'},
                {classe: 'COMBATENTE', trilha: 'Guerreiro'},
                {classe: 'COMBATENTE', trilha: 'Operações Especiais'},
                {classe: 'COMBATENTE', trilha: 'Tropa de Choque'},                
            ],
            trilhasI:[
                 {classe: 'INTELECTUAL', trilha: 'Atirador de Elite'},
                {classe: 'INTELECTUAL', trilha: 'Infiltrador'},
                {classe: 'INTELECTUAL', trilha: 'Médico de Campo'},
                {classe: 'INTELECTUAL', trilha: 'Negociador'},
                {classe: 'INTELECTUAL', trilha: 'Técnico'}
            ],
            trilhasO:[
                {classe: 'OCULTISTA', trilha: 'Conduíte'},
                {classe: 'OCULTISTA', trilha: 'Flagelador'},
                {classe: 'OCULTISTA', trilha: 'Graduado'},
                {classe: 'OCULTISTA', trilha: 'Intuitivo'},
                {classe: 'OCULTISTA', trilha: 'Lâmina Paranormal'},
            ],
            origens: [{id: 1, origem: 'ACADÊMICO', periciasT: 'Ciências e Investigação', poder: 'Saber é Poder'},
            {id: 1, origem: 'AGENTE DE SAÚDE', periciasT: 'Intuição e Medicina', poder: 'Técnica Medicinal'},
            {id: 2, origem: 'AMNÉSICO', periciasT: 'Duas à escolha do mestre', poder: 'Vislumbres do Passado'},
            {id: 3, origem: 'ARTISTA', periciasT: 'Artes e Diplomacia', poder: 'Magnum Opus'},
            {id: 4, origem: 'ATLETA', periciasT: 'Atletismo e Fortitude', poder: '110%'},
            {id: 5, origem: 'CRIMINOSO', periciasT: 'Crime e Furtividade', poder: 'O Crime Compensa'},
            {id: 6, origem: 'CULTISTA ARREPENDIDO ', periciasT: 'Enganação e Ocultismo', poder: 'Traços do Outro Lado'},
            {id: 7, origem: 'DESGARRADO', periciasT: 'Fortitude e Sobrevivência', poder: 'Calejado'},
            {id: 8, origem: 'ENGENHEIRO', periciasT: 'Profissão e Tecnologia', poder: 'Ferramentas Favoritas'},
            {id: 9, origem: 'EXECUTIVO', periciasT: 'Diplomacia e Profissão', poder: 'Processo Otimizado'},
            {id: 10, origem: 'INVESTIGADOR', periciasT: 'Investigação e Percepção', poder: 'Faro para Pistas'},
            {id: 11, origem: 'LUTADOR', periciasT: 'Acrobacia e Iniciativa', poder: 'Mão Pesada'},
            {id: 12, origem: 'MAGNATA', periciasT: 'Diplomacia e Pilotagem', poder: 'Patrocinador da Ordem'},
            {id: 13, origem: 'MERCENÁRIO', periciasT: 'Iniciativa e Tática', poder: 'Posição de Combate'},
            {id: 14, origem: 'MILITAR', periciasT: 'Atletismo e Pontaria', poder: '+1 de dano à distância'},
            {id: 15, origem: 'OPERÁRIO', periciasT: 'Fortitude e Profissão', poder: 'Ferramentas da Profissão'},
            {id: 16, origem: 'POLICIAL', periciasT: 'Percepção e Pontaria', poder: 'Patrulha'},
            {id: 17, origem: 'RELIGIOSO', periciasT: 'Religião e Vontade', poder: 'Exorcismo'},
            {id: 18, origem: 'SERVIDOR PÚBLICO', periciasT: 'Intuição e Vontade', poder: 'Espírito Cívico'},
            {id: 19, origem: 'TEÓRICO DA CONSPIRAÇÃO', periciasT: 'Investigação e Ocultismo', poder: 'Eu Já Sabia'},
            {id: 20, origem: 'T.I.', periciasT: 'Investigação e Tecnologia', poder: 'Computação Avançada'},
            {id: 21, origem: 'TRABALHADOR RURAL', periciasT: 'Adestramento e Sobrevivência', poder: 'Trilhas e Rumos'},
            {id: 22, origem: 'TRAMBIQUEIRO', periciasT: 'Crime e Enganação', poder: 'Impostor'},
            {id: 23, origem: 'UNIVERSITÁRIO', periciasT: 'Atualidades e Investigação', poder: 'Empenho'}
            ],
            id: 0,
            testando: 'a',
            localNome : '',
            localJogador : '',
            localOrigem : '',
            localClasse: '',
            localIdade : 0,
            localSexo : '',
            localLnascimento : '',
            localLresidencia : '',
            alertaNome: 'text-transform:uppercase; border-bottom: 2px solid #a2a2a2;',
            alertaJogador: 'text-transform:uppercase; border-bottom: 2px solid #a2a2a2;',
            alertaOrigem: 'text-transform:uppercase; border-bottom: 2px solid #a2a2a2;',
            alertaIdade: 'text-transform:uppercase; border-bottom: 2px solid #a2a2a2;',
            alertaSexo: 'text-transform:uppercase; border-bottom: 2px solid #a2a2a2;',
            alertaLN: 'text-transform:uppercase; border-bottom: 2px solid #a2a2a2;',
            alertaLR: 'text-transform:uppercase; border-bottom: 2px solid #a2a2a2;',

        }
    },created(){
        this.id = Number(this.$route.params.id)
        this.localOrigem = this.origem
        this.localClasse = this.classe
        console.log('A id',this.id)
    },
    mounted(){
        this.localNome = this.nome;
        this.localJogador = this.jogador;
        this.localOrigem = this.origem;
        this.localIdade = this.idade;
        this.localSexo = this.sexo;
        this.localClasse = this.classe
        this.localLnascimento = this.lnascimento;
        this.localLresidencia= this.lresidencia;
        this.localNEX = this.NEX;
        this.localPatente = this.patente
        this.localTrilha = this.trilha
    },
    watch:{
        localNome(newValue){this.$emit('nomeUpdate', newValue)},
        localJogador(newValue){this.$emit('jogadorUpdate', newValue)},
        localOrigem(newValue){this.$emit('origemUpdate', newValue)},
        localClasse(newValue){this.$emit('classeUpdate', newValue)
        console.log(newValue)},
        localIdade(newValue){this.$emit('idadeUpdate', newValue)},
        localSexo(newValue){this.$emit('sexoUpdate', newValue)},
        localLnascimento(newValue){this.$emit('lnascimentoUpdate', newValue)},
        localLresidencia(newValue){this.$emit('lresidenciaUpdate', newValue)},
        localNEX(newValue){this.$emit('NEXUpdate', newValue)},
        localPatente(newValue){this.$emit('patenteUpdate', newValue)},
        localTrilha(newValue){this.$emit('trilhaUpdate', newValue)
        console.log(newValue)
        }
    }
}

</script>
<style scoped>
.btnSalvar{
margin-left: 5px;
}
.btnSalvar:hover{
    color: black;
    background-color: aliceblue;
}
</style>
