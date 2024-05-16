const Entity = require('../models/Entity');
const mongoose = require('mongoose');

const createEntity = async (req, res) => {
    const { name, schema } = req.body;
    try {
        const entity = new Entity({ name, schema });
        await entity.save();
        res.status(201).json(entity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getEntities = async (req, res) => {
    try {
        const entities = await Entity.find();
        res.status(200).json(entities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getEntity = async (req, res) => {
    const { id } = req.params;
    try {
        const entity = await Entity.findById(id);
        res.status(200).json(entity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateEntity = async (req, res) => {
    const { id } = req.params;
    const { name, schema } = req.body;
    try {
        const entity = await Entity.findById(id);
        entity.name = name;
        entity.schema = schema;
        await entity.save();
        res.status(200).json(entity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteEntity = async (req, res) => {
    const { id } = req.params;
    try {
        await Entity.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createEntry = async (req, res) => {
    const { entityId } = req.params;
    const entry = req.body;
    try {
        const entity = await Entity.findById(entityId);
        const Model = mongoose.model(entity.name, new mongoose.Schema(entity.schema.reduce((acc, attr) => {
            acc[attr.name] = mongoose.Schema.Types[attr.type.toUpperCase()];
            return acc;
        }, {})));
        const newEntry = new Model(entry);
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getEntries = async (req, res) => {
    const { entityId } = req.params;
    try {
        const entity = await Entity.findById(entityId);
        const Model = mongoose.model(entity.name, new mongoose.Schema(entity.schema.reduce((acc, attr) => {
            acc[attr.name] = mongoose.Schema.Types[attr.type.toUpperCase()];
            return acc;
        }, {})));
        const entries = await Model.find();
        res.status(200).json(entries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createEntity,
    getEntities,
    getEntity,
    updateEntity,
    deleteEntity,
    createEntry,
    getEntries
};
