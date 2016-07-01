
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('email').useNullAsDefault();
    table.string('password').useNullAsDefault();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
