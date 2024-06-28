const task = require('../api/task.js')
const UserController = require('./user')

class taskController {
    async createTask(id, titulo, conteudo, autorId, data) {
        if (id === undefined || titulo === undefined || conteudo === undefined || autorId === undefined || data === undefined) {
            throw new Error('Id, Título, conteúdo, autorId e data são obrigatórios.')
        }

        await UserController.findUser(Number(autorId))

        const tasktValue = await task.create({
            id,
            titulo,
            conteudo,
            autorId,
            data
        })

        return tasktValue
    }

    async findTask(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }

        const tasktValue = await task.findByPk(id)
        
        if (!tasktValue) {
            throw new Error('Tarefa não encontrada.')
        }

        return tasktValue
    }

    async update(id, titulo, conteudo, autorId, data) {
        if (id === undefined || titulo === undefined || conteudo === undefined || autorId === undefined || data === undefined) {

            throw new Error('Id, Título, conteúdo, autorId e data são obrigatórios.')
        }

        await UserController.findUser(autorId)

        const tasktValue = await this.findTask(id)

        tasktValue.titulo = titulo
        tasktValue.conteudo = conteudo
        tasktValue.autorId = autorId
        tasktValue.save()

        return tasktValue
    }

    async delete(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }
        const tasktValue = await this.findTask(id)
        tasktValue.destroy()

        return
    }

    async find() {
        return task.findAll()
    }
} 

module.exports = new taskController()