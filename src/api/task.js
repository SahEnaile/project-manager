const TaskController = require('../controllers/task');

class TaskApi {
    async createTask(req, res) {
        const { titulo, conteudo, data, autorID } = req.body;

        try {
            const task = await TaskController.createTask(titulo, conteudo, data, autorID);
            return res.status(201).send(task);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar tarefa: ${e.message}` });
        }
    }

    async updateTask(req, res) {
        const { id } = req.params;
        const { titulo, conteudo, data, autorId } = req.body;

        try {
            const task = await TaskController.updateTask(id, titulo, conteudo, data, autorId);
            return res.status(200).send(task);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar tarefa: ${e.message}` });
        }
    }

    async deleteTask(req, res) {
        const { id } = req.params;

        try {
            await TaskController.deleteTask(id);
            return res.status(204).send();
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar tarefa: ${e.message}` });
        }
    }

    async findTasks(req, res) {
        try {
            const tasks = await TaskController.findTask();
            return res.status(200).send(tasks);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar tarefas: ${e.message}` });
        }
    }
}

module.exports = new TaskApi();
