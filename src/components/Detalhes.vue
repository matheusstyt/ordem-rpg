<template>
    <div class="caixa-form-detalhes">
        <div class="detalhes-inputs" action="">

            <h2>DETALHES PESSOAIS</h2>

            <div class="input-field">
                <label for="jogador">Nome do Personagem</label>
                <input  type="text" name="jogador" id="id-jogador " v-model="l_nome" spellcheck="false">
            </div>
            <div class="input-field">
                <label for="ocupacao">Origem</label>
                <select v-model="l_origem" size="1"  >
                    <option v-for="origem in origens" :key="origem.id" :value="origem.origem">{{origem.origem}}</option>

                </select>
            </div>
            <div class="input-field">
                <label for="classe">Classe</label>
                <select v-model="l_classe" size="1"  >
                    <option value="COMBATENTE">COMBATENTE</option>
                    <option value="OCULTISTA">OCULTISTA</option>
                    <option value="INTELECTUAL">INTELECTUAL</option>
                </select>

            </div>
            <div class="input-field">
                <label for="classe">Nível de Exposição Paranormal(NEX)</label>
                <input   type="number" v-model="l_NEX">
            </div>
            <div class="input-field">
                <label for="classe">Trilha (são necessários 10% de NEX)</label>
                <select v-model="l_trilha" v-if="l_NEX < 10" size="1"  >
                    <option value="Sem Patente">Sem Patente</option>
                </select>
                <select v-else-if="l_NEX >= 10 && l_classe === 'COMBATENTE'" v-model="l_trilha" size="1"  >
                    <option value="Sem Patente">Sem Patente</option>
                    <option v-for="(trilhac, index) in trilhasC" :key="index" value="trilhac.trilha">{{trilhac.trilha}}</option>
                </select>
                <select v-else-if="l_NEX >= 10 && l_classe === 'INTELECTUAL'" v-model="l_trilha" size="1"  >
                    <option value="Sem Patente">Sem Patente</option>
                    <option v-for="(trilhae, index) in trilhasI" :key="index" :value="trilhae.trilha">{{trilhae.trilha}}</option>
                </select>
                <select v-model="l_trilha" v-else-if="l_NEX >= 10 && l_classe === 'OCULTISTA'"  size="1"  >
                    <option value="Sem Patente">Sem Patente</option>
                    <option v-for="(trilhao, index) in trilhasO" :key="index" :value="trilhao.trilha">{{trilhao.trilha}}</option>
                </select>
            </div>
            <div class="input-field">
                <label for="classe">Patente</label>
                <select v-model="l_patente" size="1"  >
                    <option value="Sem Patente">Sem Patente</option>
                    <option value="Recruta">Recruta</option>
                    <option value="Operador">Operador</option>
                    <option value="Agente Especial">Agente Especial</option>
                    <option value="Oficial de Operações">Oficial de Operações</option>
                    <option value="Agente de Elite">Agente de Elite</option>
                </select>

            </div>
            <div class="input-field">
                <label for="idade">Idade</label>
                <input  type="number" name="idade" id="id-idade" v-model="l_idade">
            </div>
            <div class="input-field">
                <label for="sexo">Sexo</label>
                <input  type="text" name="sexo" id="id-sexo" v-model="l_sexo">
            </div>
            <div class="input-field">
                <label for="nascimento">Local de nascimento</label>
                <input  type="text" name="nascimento" id="id-nascimento" v-model="l_nascimento">
            </div>
            <div class="input-field">
                <label for="residencia">Local de residência</label>
                <input  type="text" name="residencia" id="id-residencia" v-model="l_residencia">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        nome : String,
        origem : String,
        classe : String,
        NEX : Number,
        trilha : String,
        patente : String,
        idade : Number,
        sexo : String,
        nascimento : String,
        residencia : String,
    },
    methods:{
    },
    data(){
        return{
            l_NEX:0,
            l_patente: '',
            l_trilha: '',
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

            l_nome : '',
            l_origem : '',
            l_classe: '',
            l_idade : 0,
            l_sexo : '',
            l_nascimento : '',
            l_residencia : '',
        }
    },created(){
        this.l_nome = this.nome;
        this.l_origem = this.origem;
        this.l_idade = this.idade;
        this.l_sexo = this.sexo;
        this.l_classe = this.classe
        this.l_nascimento = this.nascimento;
        this.l_residencia= this.residencia;
        this.l_NEX = this.NEX;
        this.l_patente = this.patente;
        this.l_trilha = this.trilha;
    },
    mounted(){
 
    },
    watch:{
        l_nome(value){this.$emit('u_nome', value)},
        l_origem(value){this.$emit('u_origem', value)},
        l_classe(value){this.$emit('u_classe', value)},
        l_NEX(value){this.$emit('u_NEX', value)},
        l_trilha(value){this.$emit('u_trilha', value)},
        l_patente(value){this.$emit('u_patente', value)},
        l_idade(value){this.$emit('u_idade', value)},
        l_sexo(value){this.$emit('u_sexo', value)},
        l_nascimento(value){this.$emit('u_nascimento', value)},
        l_residencia(value){this.$emit('u_residencia', value)},
    }
}

</script>
<style scoped lang="scss">



.btnSalvar{
margin-left: 5px;
}
.btnSalvar:hover{
    color: black;
    background-color: aliceblue;
}
</style>
