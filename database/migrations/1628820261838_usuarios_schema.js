'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuariosSchema extends Schema {
  up () {
    this.create('usuarios', (table) => {
      table.increments('id').notNullable().unique()
      table.string('login', 125).notNullable().unique()
      table.string('senha', 50).notNullable()
      table.integer('CPF').notNullable().unique()
      table.string('email', 125).notNullable().unique()
      table.integer('telefone')
      table.timestamp('data_nascimento').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('usuarios')
  }
}

module.exports = UsuariosSchema
