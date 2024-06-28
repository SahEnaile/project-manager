const database = require('../config/database.js')

class Task {
    constructor() {
        this.model = database.db.define('task', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true
            },
            titulo: {
                type: database.db.Sequelize.STRING
            },
            conteudo: {
                type: database.db.Sequelize.STRING
            },
            autorId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            data: {
                type: database.db.sequelize.INTEGER,
            }
        })
    }
}

module.exports = (new Task()).model