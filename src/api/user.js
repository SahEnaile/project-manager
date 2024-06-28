const UserController = require('../controllers/user');

class UserApi {
    async createUser(req, res) {
        const { nome, email, senha, data } = req.body;

        try {
            const user = await UserController.createUser(nome, email, senha, data);
            return res.status(201).send(user);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar usuário: ${e.message}` });
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const { nome, email, senha, data } = req.body;

        try {
            const user = await UserController.updateUser(id, nome, email, senha, data);
            return res.status(200).send(user);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar usuário: ${e.message}` });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;

        try {
            await UserController.deleteUser(id);
            return res.status(204).send();
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar usuário: ${e.message}` });
        }
    }

    async findUsers(req, res) {
        try {
            const users = await UserController.findUsers();
            return res.status(200).send(users);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar usuários: ${e.message}` });
        }
    }

    async login(req, res) {
        const { email, senha } = req.body;

        try {
            const token = await UserController.login(email, senha);
            return res.status(200).send({ token });
        } catch (e) {
            return res.status(401).send({ error: `Erro ao realizar login: ${e.message}` });
        }
    }

    async validateToken(req, res, next) {
        const token = req.headers.authorization;

        try {
            await UserController.validateToken(token);
            next();
        } catch (e) {
            return res.status(401).send({ error: `Erro ao validar token: ${e.message}` });
        }
    }
}

module.exports = new UserApi();
