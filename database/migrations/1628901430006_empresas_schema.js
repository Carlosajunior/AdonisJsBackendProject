'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmpresasSchema extends Schema {
  up () {
    this.create('empresas', (table) => {
      table.increments('id').notNullable().unique()
      table.string('nome_dono_da_empresa',125).notNullable()
      table.integer('CNPJ').notNullable().unique()
      table.string('nome_fantasia',125).notNullable()
      table.string('razao_social', 125).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('empresas')
  }
}

module.exports = EmpresasSchema
