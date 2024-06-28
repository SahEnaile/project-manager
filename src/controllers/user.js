const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'moranguinho';
const SALT_VALUE = 10;

class UserController {
    async createUser(id, nome, email, senha, data) {
        if (!id || !nome || !email || !senha || !data) {
            throw new Error('Id, Nome, email, senha e data são obrigatórios.');
        }

        const cypherSenha = await bcrypt.hash(senha, SALT_VALUE);

        const userValue = await User.create({
            id,
            nome,
            email,
            senha: cypherSenha,
            data
        });

        return userValue;
    }

    async findUser(id) {
        if (!id) {
            throw new Error('Id é obrigatório.');
        }

        const userValue = await User.findByPk(id);
        
        if (!userValue) {
            throw new Error('Usuário não encontrado.');
        }

        return userValue;
    }

    async update(id, nome, email, senha, data) {
        if (!id || !nome || !email || !senha || !data) {
            throw new Error('Id, Nome, email, senha e data são obrigatórios.');
        }

        const userValue = await this.findUser(id);

        userValue.nome = nome;
        userValue.email = email;
        userValue.senha = await bcrypt.hash(senha, SALT_VALUE);
        userValue.data = data;
        await userValue.save();

        return userValue;
    }

    async delete(id) {
        if (!id) {
            throw new Error('Id é obrigatório.');
        }
        const userValue = await this.findUser(id);
        await userValue.destroy();

        return;
    }

    async find() {
        return User.findAll();
    }

    async login(email, senha) {
        if (!email || !senha) {
            throw new Error('Email e senha são obrigatórios.');
        }

        const userValue = await User.findOne({ where: { email } });

        if (!userValue) {
            throw new Error('Usuário e senha inválidos.');
        }

        const senhaValida = await bcrypt.compare(senha, userValue.senha);
        if (!senhaValida) {
            throw new Error('Usuário e senha inválidos.');
        }

        return jwt.sign({ id: userValue.id }, SECRET_KEY, { expiresIn: '1h' });
    }

    async validateToken(token) {
        if (!token) {
            throw new Error('Token inválido');
        }

        try {
            await jwt.verify(token, SECRET_KEY);
        } catch (err) {
            throw new Error('Token inválido');
        }
    }
} 

module.exports = new UserController();
