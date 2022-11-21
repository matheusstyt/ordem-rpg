(async ()=>{
    const db = require('./mysql')
    //const port = process.env.port || 4000;
    //const server = http.createServer()
    //server.listen(port)

    //const insert = await db.insertUser({nome: 'matheus', username: 'admin', email: 'matheus20galdino@gmail.com', password: '7410', status: 1, mestre: 1});
    //console.log('result query ', insert)

    

    //const update = await db.updateUser(2, {nome: 'erik teste', username: 'erick20tyt'});
    //console.log('result query ', update)

    const user = await db.selectUser()
    console.log('banco de dados', user);
})();
