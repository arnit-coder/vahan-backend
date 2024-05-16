const express = require('express');
const {
    createEntity,
    getEntities,
    getEntity,
    updateEntity,
    deleteEntity,
    createEntry,
    getEntries
} = require('../controllers/entityController');

const router = express.Router();

router.post('/', createEntity);
router.get('/', getEntities);
router.get('/:id', getEntity);
router.put('/:id', updateEntity);
router.delete('/:id', deleteEntity);
router.post('/:entityId/entries', createEntry);
router.get('/:entityId/entries', getEntries);

module.exports = router;
