import axios from 'axios';

const host = require("@/config/env").host
const port = require("@/config/env").port
const headers = { Authorization: "Token " + sessionStorage.getItem("token") };

export function carregar_personagem(session_id) {

    try {

        return axios.get(`${host}:${port}/personagem/`, { params : { fk_session : session_id }, headers : headers })
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(error => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return null
        })

    } catch (error) {
        console.log(error)
    }
}