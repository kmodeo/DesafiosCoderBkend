//anterior que funciona bien

const knex = require('knex')({
    client: 'better-sqlite3',
    useNullAsDefault:true,
    connection: {

        filename: './managers/DB/ecommerce.sqlite'
    }
})

module.exports = knex;


