"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments("id").notNullable().unique();
      table.string("email", 125).notNullable().unique();
      table.string("password").notNullable();
      table.string("cpf", 11).notNullable().unique();
      table.string("telefone", 12);
      table.date("data_nascimento").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
