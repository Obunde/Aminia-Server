// migrations/20250917194500_create_users_table.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary(); // Auto-increment integer PK
    table.string("email", 255).notNullable().unique();
    table.text("password_hash").notNullable();
    table.text("address");
    table.string("role", 50).defaultTo("customer");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists("users");
}
