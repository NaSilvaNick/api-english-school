const { Turmas } = require('../models')
const { Op } = require('sequelize')

class TurmaController {
    static async pegaTodasAsTurmas(req,res){
        try {
            const { data_inicial, data_final } = req.query
            const where = {}

            data_inicial || data_final ? where.data_inicio = {} : null
            data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
            data_final ? where.data_inicio[Op.lte] = data_final : null            

            const todasAsTurmas = await Turmas.findAll({where})
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaTurma(req,res){
        try {
            const { id } = req.params
            const umaTurma = await Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(umaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaTurma(req,res){
        try {
            const novaTurma = req.body
            const novaTurmaCriada = await Turmas.create(novaTurma)
            return res.status(200).json(novaTurmaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaTurma(req,res){
        try {
            const { id } = req.params
            const novasInfos = req.body
            const umaTurma = await Turmas.update(novasInfos, { where: { id: Number(id) } } )
            return res.status(200).json(umaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaTurma(req,res){
        try {
            const { id } = req.params
            await Turmas.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ message: `id ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController