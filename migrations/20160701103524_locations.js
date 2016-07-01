
exports.up = function(knex, Promise) {
  return knex.schema.createTable('locations',function(table) {
    table.increments('id').primary();
    table.string('state').notNullable();
    table.string('city').notNullable();
    table.string('zip').notNullable();
    table.string('address').notNullable();
    table.string('rating');
    table.string('building_img');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('locations')
};
