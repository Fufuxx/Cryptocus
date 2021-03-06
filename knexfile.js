// Update with your config settings.
module.exports = {  
    development: {
        client: 'postgresql',
        connection: {
            database: 'q-boiler'
        },
        debug: true
    },
    production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
        
    }
};