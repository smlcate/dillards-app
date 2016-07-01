
exports.up = function(knex, Promise) {
  return knex.schema.createTable('employees', function(table) {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.string('lid'); //location id
    table.string('did'); //department id
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('employees');
};
