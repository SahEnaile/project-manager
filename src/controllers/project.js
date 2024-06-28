const Project = require('../models/project'); 
const UserController = require('./user'); 

class projectController {
    async createProject(id, titulo, conteudo, autorId, data) {
        if (!id || !titulo || !conteudo || !autorId || !data) {
            throw new Error('Id, Título, conteúdo, autorId e data são obrigatórios.');
        }

        await UserController.findUser(Number(autorId));

        const projectValue = await Project.create({
            id,
            titulo,
            conteudo,
            autorId,
            data
        });

        return projectValue;
    }

    async findProject(id) {
        if (!id) {
            throw new Error('Id é obrigatório.');
        }

        const projectValue = await Project.findByPk(id);
        
        if (!projectValue) {
            throw new Error('Projeto não encontrado.');
        }

        return projectValue;
    }

    async update(id, titulo, conteudo, autorId, data) {
        if (!id || !titulo || !conteudo || !autorId || !data) {
            throw new Error('Id, Título, conteúdo, autorId e data são obrigatórios.');
        }

        await UserController.findUser(autorId);

        let projectValue = await this.findProject(id);

        projectValue = await projectValue.update({
            id,
            titulo,
            conteudo,
            autorId,
            data
        });

        return projectValue;
    }

    async delete(id) {
        if (!id) {
            throw new Error('Id é obrigatório.');
        }

        const projectValue = await this.findProject(id);
        await projectValue.destroy();

        return;
    }

    async find() {
        return Project.findAll();
    }
} 

module.exports = new projectController();
