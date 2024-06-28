const express = require('express');
const TaskApi = require('../api/task.js');

const router = express.Router();

router.post('/', TaskApi.createTask)
router.put('/:id', TaskApi.updateTask)
router.get('/', TaskApi.findTask)
router.delete('/:id', TaskApi.deleteTask)

module.exports = router;