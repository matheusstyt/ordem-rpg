const host = require("@/config/env").host
const port = require("@/config/env").port
const headers = { Authorization: "Token " + sessionStorage.getItem("token") };

function aceitar_pedido(fk_origem, fk_destino, id) {
    let now = new Date();
    let formatter = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
    });
    let formattedDate = formatter.format(now);

    if (sessionStorage.getItem("token")) {

        const body_uni = {
            fk_user: fk_destino,
            fk_friend: fk_origem,
            data_inicio: String(formattedDate),
        };
        const body_bi = {
            fk_user: fk_origem,
            fk_friend: fk_destino,
            data_inicio: String(formattedDate),
        };
        console.table(body_uni);
        axios.post(`${host}:${port}/contact/`, body_uni, { headers: headers })
        .then((res) => {     
            axios.post(`${host}:${port}/contact/`, body_bi, { headers: headers })
            .then((res) => {
                excluir_pedido(id);
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
}
function excluir_pedido(id) {

    axios.delete(`${host}:${port}/ask/${id}/`, { headers: headers })
        .then((res) => {
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        });
}