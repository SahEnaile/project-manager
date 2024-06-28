const ProjectController = require('../controllers/project');

class ProjectApi {
    async createProject(req, res) {
        const { titulo, conteudo, data, autorID } = req.body;

        try {
            const project = await ProjectController.createProject(titulo, conteudo, data, autorID);
            return res.status(201).send(project);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar projeto: ${e.message}` });
        }
    }

    async updateProject(req, res) {
        const { id } = req.params;
        const { titulo, conteudo, data, autorID } = req.body;

        try {
            const project = await ProjectController.updateProject(id, titulo, conteudo, autorID, data);
            return res.status(200).send(project);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar projeto: ${e.message}` });
        }
    }

    async deleteProject(req, res) {
        const { id } = req.params;

        try {
            await ProjectController.deleteProject(id);
            return res.status(204).send();
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar projeto: ${e.message}` });
        }
    }

    async findProjects(req, res) {
        try {
            const projects = await ProjectController.findProjects();
            return res.status(200).send(projects);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar projetos: ${e.message}` });
        }
    }
}

module.exports = new ProjectApi();
