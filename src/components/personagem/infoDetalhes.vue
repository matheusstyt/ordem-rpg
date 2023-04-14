<template>
 
    <ul class="info-detalhes">
        <h3>INFORMARÇÕES PESSOAIS</h3>
        <li class="text-field">
            <h4>Nome</h4>
            <p >{{ nome }}</p>
        </li>
        <li class="text-field">
            <h4>Origem</h4>
            <p >{{ origem }}</p>
        </li>
        <li class="text-field">
            <h4>Classe</h4>
            <p >{{ classe }}</p>
        </li>
        <li class="text-field">
            <h4>NEX</h4>
            <p >{{ NEX }}</p>
        </li>
        <li class="text-field">
            <h4>Trilha</h4>
            <p >{{ trilha }}</p>
        </li>
        <li class="text-field">
            <h4>Patente</h4>
            <p >{{ patente }}</p>
        </li>
        <li class="text-field">
            <h4>Idade</h4>
            <p >{{ idade }}</p>
        </li>
        <li class="text-field">
            <h4>Sexo</h4>
            <p >{{ sexo }}</p>
        </li>
        <li class="text-field">
            <h4>Local de nascimento</h4>
            <p >{{ nascimento }}</p>
        </li>
        <li class="text-field">
            <h4>Local de residência</h4>
            <p >{{ residencia }}</p>
        </li>

    </ul>
</template>

<script>
export default {
    props:{
        nome : String,
        origem : String,
        classe : String,
        NEX : String,
        trilha : String,
        patente : String,
        idade : String,
        sexo : String,
        nascimento : String,
        residencia : String,
    },
    methods:{
    },
    data(){
        return{

        }
    }
}

</script>
<style scoped lang="scss">
#app {
    height: 100%;
}
.info-detalhes{
    background-color: rgba(0, 0, 0, 0.701);
    padding: 0 1em;
    width: 50%;
    @media screen and (max-width: 700px) {
        width: 90%;
    }
    h3{
        text-align: center;
    }
    .text-field{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px dashed #a5a5a5;
        gap: 1em;
        h4, p{
            margin: 0;
            padding: 0;
        }
        p{
            color: #d2d2d2;
            padding: 0.4em;
            border-radius: 4px;
        }
    }
}
.info-detalhes li:last-child{
    border-bottom: none;
}
.btnSalvar{
margin-left: 5px;
}
.btnSalvar:hover{
    color: black;
    background-color: aliceblue;
}
</style>
