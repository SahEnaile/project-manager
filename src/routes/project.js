const express = require('express');
const ProjectApi = require('../api/project.js');

const router = express.Router();

router.post('/', ProjectApi.createProject)
router.put('/:id', ProjectApi.updateProject)
router.get('/', ProjectApi.findProject)
router.delete('/:id', ProjectApi.deleteProject)

module.exports = router;