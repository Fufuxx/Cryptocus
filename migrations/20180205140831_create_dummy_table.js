
exports.up = function(knex, Promise) {
    return knex.schema.createTable('dummy_table', function(table){
        table.increments(); // id serial primary key
        table.timestamps(true, true);
        table.string('name');
        table.string('url');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('dummy_table');
};
