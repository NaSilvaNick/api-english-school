const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
    constructor(){
        super('Pessoas')
        this.Matriculas = new Services('Matriculas')
    }
    
    async pegaRegistosAtivos(where = {}){
        return database[this.modelo].findAll({where: { ...where }})
    }

    async pegaTodosOsRegistos(where = {}){
        return database[this.modelo]
            .scope('todos')
            .findAll({where: { ...where }})
    }

    async cancelaPessoasEMatriculas(estudanteId){
        return database.sequelize.transaction(async transacao => {
            await super.atualizaRegistro({ativo: false}, estudanteId, transacao)
            await this.Matriculas.atualizaRegistros(
                {status: 'cancelado'},{ estudante_id: estudanteId }, {transaction: transacao }
            )
        })
    }
}

module.exports = PessoasServices