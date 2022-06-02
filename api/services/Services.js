const database = require('../models')

class Services {
    constructor(modelo){
        this.modelo = modelo
    }

    async pegaTodosOsRegistros(){
        return await database[this.modelo].findAll()
    }

    async pegaUmRegisto(id){}

    async criaRegisto(dados){}

    async atualizaRegistro(dados,id,transacao = {}){
        return await database[this.modelo].update(dados, {where: {id:id}}, transacao)
    }

    async atualizaRegistros(dados,where = {},transacao = {}){
        return await database[this.modelo].update(dados, {where: { ...where }}, transacao)
    }

    async apagaRegisto(id){}
}

module.exports = Services