const dotenv = require('dotenv').config()
const knex = require('knex')({
    client: 'mysql2',
    
    useNullAsDefault: true,

    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'ecommerce_db'
      
    }
})

module.exports = knex