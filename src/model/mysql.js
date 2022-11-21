async function getConnection(){
    if(global.connection && global.connection.state !== "disconnected"){
        return global.connection
    }
    const mysql = require('mysql2/promise');
    const con = await mysql.createConnection({
        user: 'root',
        password: 'usbw',
        host: 'localhost',
        port: 6607,
        database: 'rpgdb',
    });
    con.connect( function(error) {
        if(error) throw error;
        console.log("Connected to database");
      });
    console.log("Connected");
    global.connection = con
    try {
        
        return con 
    } catch (error) {
        console.log('deu ruim')
    }    
}
//getConnection()
async function selectUserName(){
    const con = await getConnection();
    const [rows] = await con.query('SELECT * from usuario')
    return rows
}
async function selectSessao(id){
    const con = await getConnection();
    const [rows] = await con.query(`SELECT * from sessao where fk_idMestre = ${id}`)
    return rows
}
async function selectPerson(id){
    const con = await getConnection();
    const [rows] = await con.query(`SELECT p.idPersonagem, acao, classe, idade, lnascimento, lresidencia, movimento, nome_jogador, nome_personagem, origem, reacao, sexo, v.atual_v, v.maximo_v, v.idVida, s.atual_s, s.maximo_s, e.atual_e, e.maximo_e, a.idAtributos, a.json_a, pe.idPericia, pe.json_p, r.id_resistencia, r.json_r, an.idAntescendentes, an.json_an, ar.json_ar, ar.json_ar, s.idSanidade, e.idEsforco, ar.idArmas
                                    FROM sistema_personagem AS p
                                    INNER JOIN vida AS v ON v.idVida = p.fk_idVida
                                    INNER JOIN sanidade AS s ON s.idSanidade = p.fk_idSanidade
                                    INNER JOIN esforco AS e ON e.idEsforco = p.fk_idEsforco
                                    INNER JOIN atributos AS a ON p.idPersonagem = a.fk_idPersonagem
                                    INNER JOIN pericias AS pe ON p.idPersonagem = pe.fk_idPersonagem
                                    INNER JOIN resistencias AS r ON p.idPersonagem = r.fk_idPersonagem
                                    INNER JOIN antescendentes AS an ON p.idPersonagem = an.fk_idPersonagem
                                    INNER JOIN armas AS ar ON p.idPersonagem = ar.fk_idPersonagem
                                    INNER JOIN sessao AS se ON se.idSessao = p.fk_idSessao
                                    WHERE se.idSessao = ${id}`);
    return rows
}
async function insertUser(user){
    const con = await getConnection();
    const sql = 'insert into usuario (nome, username, email, password, status, mestre) values (?, ?, ?, ?, ?, ?);';
    const values = [user.nome, user.username, user.email, user.password, 1, user.mestre];
    await con.query(sql, values);
}
async function insertSessao(sessao){
    const con = await getConnection();
    const sql1 = 'insert into sessao (dataInicio, qtdMaxima, status, tempoDecorrido, fk_idMestre) values (?, ?, ?, ?, ?)'
    const values1 = [sessao.dataInicio, sessao.qtdMaxima, sessao.status, sessao.tempoDecorrido, sessao.fk_idMestre]
    await con.query(sql1, values1)
}// INSERT DO PERSONAGEM
async function insertPerson(dados){
    const con = await getConnection();
    //VIDA
    const sqlVida = 'insert into vida (atual_v, maximo_v) values (?, ?);';
    const valuesVida = [dados.vida.atual, dados.vida.maximo];
    await con.query(sqlVida, valuesVida);

    const [[rowFk]] = await con.query(`SELECT idVida from vida where atual_v =  ${dados.vida.atual} and maximo_v =  ${dados.vida.maximo} order by idVida DESC`)
    let fkVida = rowFk.idVida
    // SANIDADE
    const sqlSanidade = 'insert into sanidade (atual_s, maximo_s) values (?, ?);';
    const valuesSanidade = [dados.sanidade.atual, dados.sanidade.maximo];
    await con.query(sqlSanidade, valuesSanidade);

    const [rowFk1] = await con.query(`SELECT idSanidade from sanidade where atual_s = ${dados.sanidade.atual} and maximo_s = ${dados.sanidade.maximo} order by idSanidade DESC`)
    let fkSanidade = rowFk1[0].idSanidade
    // ESFORÇO
    const sqlEsforco = 'insert into esforco (atual_e, maximo_e) values (?, ?);';
    const valuesEsforco = [dados.esforco.atual, dados.esforco.maximo];
    await con.query(sqlEsforco, valuesEsforco);

    const [rowFk2] = await con.query(`SELECT idEsforco from esforco where atual_e = ${dados.esforco.atual} and maximo_e = ${dados.esforco.maximo} order by idEsforco DESC`)
    let fkEsforco = rowFk2[0].idEsforco
    console.log(fkEsforco)

    const sql2 = 'insert into sistema_personagem (nome_jogador, nome_personagem, origem, classe, sexo, idade, lnascimento, lresidencia, movimento, acao, reacao, fk_idVida, fk_idSanidade, fk_idEsforco, fk_idSessao) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    const values2 = [dados.nome, dados.jogador, dados.origem, dados.classe, dados.sexo, dados.idade, dados.lnascimento,dados.lresidencia, dados.movimento,dados.acao,dados.reacao, fkVida, fkSanidade, fkEsforco, dados.idsessao];
    await con.query(sql2, values2);

    const [[rowFkP]] = await con.query(`SELECT idPersonagem from sistema_personagem where fk_idVida =  ${fkVida} and fk_idSanidade =  ${fkSanidade} and fk_idEsforco =  ${fkEsforco} order by idPersonagem DESC`)
    let fkPersonagem = rowFkP.idPersonagem

    // ATRIBUTOS

    let sqlAtributo = 'insert into atributos (fk_idPersonagem, json_a) values (?, ?);';
    let valuesAtributo = [fkPersonagem, JSON.stringify(dados.atributos)];
    await con.query(sqlAtributo, valuesAtributo);

    // PERICIA
    let sqlPericia = 'insert into pericias (fk_idPersonagem, json_p) values (?, ?);';
    let valuesPericia = [fkPersonagem, JSON.stringify(dados.pericias)];
    await con.query(sqlPericia, valuesPericia);

    // RESISTENCIAS
    let sqlResistencias = 'insert into resistencias (fk_idPersonagem, json_r) values (?, ?);';
    let valuesResistencias = [fkPersonagem, JSON.stringify(dados.resistencias)];
    await con.query(sqlResistencias, valuesResistencias);

    // ANTESCENDENTES
    let sqlAntescendentes = 'insert into antescendentes (fk_idPersonagem, json_an) values (?, ?);';
    let valuesAntescendentes = [fkPersonagem, JSON.stringify(dados.antescendentes)];
    await con.query(sqlAntescendentes, valuesAntescendentes);

    // ARMAS    
    console.log(dados.armamentos);
    console.log(JSON.stringify(dados.armamentos));
    let sqlArmas = 'insert into armas (fk_idPersonagem, json_ar) values (?, ?);';
    let valuesArmas = [fkPersonagem, armamentos];
    con.query(sqlArmas, valuesArmas);
  
}
async function updateUser(id, user){
    const con = await getConnection();
    const sql = 'update mydb.usuario set nome=?, username=? where usuario.id == ?';
    const values = [id, user.nome, user.username]
}
async function updatePerson(dados, idP, idV, idS, idE, idO, idAr, idAn){
const con = await getConnection();

const sqlP = `UPDATE sistema_personagem SET idade = ?, lnascimento = ?, lresidencia = ?, movimento = ?, nome_jogador = ?, nome_personagem = ?, origem = ?, reacao = ?, sexo = ? where idPersonagem = ?`
const valuesP = [dados.idade, dados.lnascimento, dados.lre sidencia,dados.movimento, dados.nome_jogador, dados.nome_personagem, dados.origem, dados.resistencias, dados.sexo, idP]
const updateP = await con.query(sqlP, valuesP);

const sqlV = `UPDATE vida SET atual_v = ?, maximo_v = ? WHERE idVida = ?`
const valuesV = [dados.atual_v, dados.maximo_v, idV]
const updateV = await con.query(sqlV, valuesV)

const sqlS = `UPDATE sanidade SET atual_s = ?, maximo_s = ? WHERE idSanidade = ?`
const valuesS = [dados.atual_s, dados.maximo_s, idS]
const updateS = await con.query(sqlS, valuesS)

const sqlE = `UPDATE esforco SET atual_e = ?, maximo_e = ? WHERE idEsforco = ?`
const valuesE = [dados.atual_e, dados.maximo_e, idE]
const updateE = await con.query(sqlE, valuesE)

// const sqlO = `UPDATE ocultismo SET atual_o = ?, maximo_o = ? WHERE idOcultismo = ?`
// const valuesO = [dados.atual_o, dados.maximo_o, idO]
// const updateO = await con.query(sqlO, valuesO)

const sqlAr = `UPDATE armas SET json_ar = ? WHERE idArma = ?`
const valuesAr = [dados.json_ar, idAr]
//const updateAr = await con.query(sqlAr, valuesAr);

const sqlAn = `UPDATE antescendentes SET json_an = ? WHERE idAntescendentes = ?`
const valuesAn = [dados.json_an, idAn]
const updateAn = await con.query(sqlAn, valuesAn)
}

module.exports = {selectUserName, selectSessao, selectPerson, insertUser, insertSessao, insertPerson, updateUser, updatePerson}