
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table) {
    table.increments('id').primary();
    table.string('comment').notNullable();
    table.timestamp('post_date').defaultTo(knex.fn.now());
    table.string('lid');
    table.string('did');
    table.string('owner');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
