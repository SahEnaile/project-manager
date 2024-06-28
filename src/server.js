const app = require('./app');
const database = require('./config/database.js'); 
const PORT = process.env.PORT || 4000;

database.db.sync({ force: false })
    .then(() => {
        console.log('Database connected and synced');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(`Error syncing database: ${err}`);
    });
