// migrations/20250917193000_create_products_table.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("products", (table) => {
    table.increments("id").primary(); // Auto-increment integer PK
    table.string("name", 255).notNullable();
    table.text("description");
    table.string("status", 50).defaultTo("pending");
    table.integer("seller_id").notNullable();
    table.integer("buyer_id").nullable();
    table.integer("transporter_id").nullable();
    table.integer("warehouse_id").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    // Foreign keys
    table
      .foreign("buyer_id")
      .references("id")
      .inTable("users")
      .onUpdate("NO ACTION")
      .onDelete("SET NULL");

    table
      .foreign("seller_id")
      .references("id")
      .inTable("users")
      .onUpdate("NO ACTION")
      .onDelete("CASCADE");

    table
      .foreign("transporter_id")
      .references("id")
      .inTable("users")
      .onUpdate("NO ACTION")
      .onDelete("SET NULL");

    table
      .foreign("warehouse_id")
      .references("id")
      .inTable("users")
      .onUpdate("NO ACTION")
      .onDelete("SET NULL");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists("products");
}
