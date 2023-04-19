import axios from 'axios';

const host = require("@/config/env").host
const port = require("@/config/env").port
const headers = { Authorization: "Token " + sessionStorage.getItem("token") };

export async function salvar_personagem(session_id, user_id, data) {
    var id_vida, id_sandiade, id_ocultismo, id_esforco, id_antescendentes, 
        id_atributos, id_pericias, id_resistencias, id_perfil, id_armamentos = null, id_acessorios = null, id_inventario;
    try {
        id_perfil = await salvar_img_perfil(data.imagem_base64)
        id_vida = await salvar_vida(data.vida)
        id_sandiade = await salvar_sanidade(data.sanidade)
        id_ocultismo = await salvar_ocultismo(data.ocultismo)
        id_esforco = await salvar_esforco(data.esforco)
        
        id_antescendentes = await salvar_antescendentes(data.antescendentes)
        id_atributos = await salvar_atributos(data.atributos)
        id_pericias = await salvar_pericias(data.pericias)
        id_resistencias = await salvar_resistencias(data.resistencias)
        
        const body_personagem = {
            nome : data.nome,
            origem : data.origem,
            idade : data.idade,
            classe : data.classe,
            NEX : data.NEX,
            trilha : data.trilha,
            sexo : data.sexo,
            patente : data.patente,
            nascimento : data.nascimento,
            residencia : data.residencia,

            lesao_grave : data.lesao_grave,
            inconsciente : data.inconsciente,
            morrendo : data.morrendo,
            traumatizado : data.traumatizado,
            enlouquecendo : data.enlouquecendo,

            fk_perfil_img : id_perfil,
            fk_vida : id_vida,
            fk_sanidade : id_sandiade,
            fk_ocultismo : id_ocultismo,
            fk_esforco : id_esforco,

            fk_atributos : id_antescendentes,
            fk_pericias : id_atributos,
            fk_resistencias : id_pericias,
            fk_antescendentes : id_resistencias,

            fk_session : parseInt(session_id),
            fk_user : parseInt(user_id),
        }
        console.table(body_personagem)
        axios.post(`${host}:${port}/personagem/`, body_personagem, { headers : headers })
        .then(res => {
            console.log(res.data)

            loop_armamentos(res.data.id, data.armamentos)
            loop_acessorios(res.data.id, data.acessorios)

            alert('deu certo')
        })
        .catch(error => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        })

    } catch (error) {
        console.log(error)
    }
    async function salvar_img_perfil(data_url){
        const body_img = { image : data_url };
            try {
                const res = await axios.post(`${host}:${port}/perfil/`, body_img, { headers : {
                    'Content-Type': 'multipart/form-data',
                     Authorization: "Token " + sessionStorage.getItem("token")
                } } )
                console.log(`perfil - ${res.data.id}`)
                return res.data.id
            } catch (error) {
                return null
            }
    }
    async function salvar_vida(body_vida) {
        // vida post
        try {
            const res = await axios.post(`${host}:${port}/vidaPersonagem/`, body_vida, { headers : headers } )
            console.log(`vida - ${res.data.id}`)
            return res.data.id
        } catch (error) {
            return null
        }

    }
    async function salvar_sanidade(body_sanidade) {
        // sanidade post
        try {
            const res = await axios.post(`${host}:${port}/sanidadePersonagem/`, body_sanidade, { headers : headers } )
            console.log(`sanidade - ${res.data.id}`)
            return res.data.id
        } catch (error) {
            return null
        }
    }
    async function salvar_ocultismo(body_ocultismo) {
        try {
            const res = await axios.post(`${host}:${port}/ocultismoPersonagem/`, body_ocultismo, { headers : headers } )
            console.log(`ocultismo - ${res.data.id}`)
            return res.data.id
        } catch (error) {
            return null
        }
        // ocultismo post
    }
    async function salvar_esforco(body_esforco) {
        try {
            const res = await axios.post(`${host}:${port}/esforcoPersonagem/`, body_esforco, { headers : headers } )
            console.log(`esforco - ${res.data.id}`)
            return res.data.id
        } catch (error) {
            return null
        }
        // esforco post
    }
    async function salvar_antescendentes(body_antescendentes) {
        try {
            var jbody = { cadeia : JSON.stringify(body_antescendentes) };
            const res = await axios.post(`${host}:${port}/antescendentesPersonagem/`, jbody, { headers : headers } )
            console.log(`antescendentes - ${res.data.id}`)
            return res.data.id
        } catch (error) {
            return null
        }
        // antescendentes post
    }
    async function salvar_atributos(body_atributos) {
        try {
            var jbody = { cadeia : JSON.stringify(body_atributos) }
            const res = await axios.post(`${host}:${port}/atributosPersonagem/`, jbody, { headers : headers } )
            console.log(`atributos - ${res.data.id}`)
            return res.data.id
        } catch (error) {
            return null
        }
        // atributos post
    }
    async function salvar_pericias(body_pericias) {
        var jbody = { cadeia : JSON.stringify(body_pericias) }

        try {
            const res = await axios.post(`${host}:${port}/periciasPersonagem/`, jbody, { headers : headers } )
            console.log(`pericias - ${res.data.id}`)
            return res.data.id
        } catch (error) {
            return null
        }
        // pericias post
    }
    async function salvar_resistencias(body_resistencias) {
        var jbody = { cadeia : JSON.stringify(body_resistencias) }

        try {
            const res = await axios.post(`${host}:${port}/resistenciasPersonagem/`, jbody, { headers : headers } )
            console.log(`resistencias - ${res.data.id}`)
            return res.data.id
        } catch (error) {
            return null
        }
        // resistencias post
    }

    function loop_armamentos(fk_personagem, body_armamentos) {

        body_armamentos.forEach(armamento => {
            salvar_armamento(fk_personagem, armamento)
        });
    }
    async function salvar_armamento(fk, armamento) {
        var new_body = armamento;
        new_body.fk_personagem = fk;
        try {
            const res = await axios.post(`${host}:${port}/armamentosPersonagem/`, new_body, { headers : headers } )
            console.log(`armamento - ${res.data.id}`)
            return res.data.id

        } catch (error) {
            return null
        }
    }
    function loop_acessorios(fk_personagem, body_acessorios) {

        body_acessorios.forEach(acessorio => {
            salvar_acessorio(fk_personagem, acessorio)
        });
    }
    async function salvar_acessorio(fk, acessorio) {
        var new_body = acessorio;
        new_body.fk_personagem = fk;
        try {
            const res = await axios.post(`${host}:${port}/acessoriosPersonagem/`, new_body, { headers : headers } )
            console.log(`acessorio - ${res.data.id}`)
            return res.data.id
        } catch (error) {
            return null
        }
        // acessorios post
    }

    async function salvar_inventario(fk_personagem, fk_armamentos, fk_acessorios) {
        try {
            // inventario post
            const body_inventario = {
                fk_armamentos : fk_armamentos,
                fk_acessorios : fk_acessorios,
                fk_personagem : fk_personagem
            }
            const res = await axios.post(`${host}:${port}/vidaPersonagem/`, body_inventario, { headers : headers } )
            console.log(`inventario - ${res.data.id}`)
            return res.data.id
        } catch (error) {
            return null
        }

    }
    
}