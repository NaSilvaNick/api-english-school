const { Niveis } = require('../models')

class NivelController {
    static async pegaTodasOsNiveis(req,res){
        try {
            const todasOsNiveis = await Niveis.findAll()
            return res.status(200).json(todasOsNiveis)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmNivel(req,res){
        try {
            const { id } = req.params
            const umNivel = await Niveis.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(umNivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaNivel(req,res){
        try {
            const novaNivel = req.body
            const novaNivelCriada = await Niveis.create(novaNivel)
            return res.status(200).json(novaNivelCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaNivel(req,res){
        try {
            const { id } = req.params
            const novasInfos = req.body
            const umNivel = await Niveis.update(novasInfos, { where: { id: Number(id) } } )
            return res.status(200).json(umNivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaNivel(req,res){
        try {
            const { id } = req.params
            await Niveis.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ message: `id ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = NivelController