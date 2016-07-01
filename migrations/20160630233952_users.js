
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('lid');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
