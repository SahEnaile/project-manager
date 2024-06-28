const database = require('../config/database.js')

class Project {
    constructor() {
        this.model = database.db.define('project', {
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

module.exports = (new Project()).model