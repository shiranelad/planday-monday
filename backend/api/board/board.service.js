const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        console.log('filterBy', filterBy);
        const criteria = _buildCriteria(filterBy)
        const sortCriteria = _buildSortCriteria(filterBy)
        // const criteria = {}
        // console.log('server filterby' , filterBy)
        // let { name, sortBy} = filterBy
        // criteria.name = name
        const collection = await dbService.getCollection('board')
        var boards = await collection.find(criteria).sort(sortCriteria).collation({ locale: "en" }).toArray()
        // var boards = await collection.find(criteria).toArray()
        // console.log('boards', boards);
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = collection.findOne({ '_id': ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ '_id': ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function add(board) {
    console.log(board);
    try {
        console.log('HELLO')
        const collection = await dbService.getCollection('board')
        // console.log('board', board);
        // delete board._id
        const addedBoard = await collection.insertOne(board)
        console.log('addedBoard', addedBoard)
        return addedBoard.ops[0]
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}
async function update(board) {
    try {
        var id = board._id
        delete board._id
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ "_id": ObjectId(id) }, { $set: { ...board } })
        board._id = id
        return board
    } catch (err) {
        logger.error(`cannot update board ${board._id}`, err)
        throw err
    }
}

//Needs refactoring to match board
function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.name) {
        const txtCriteria = { $regex: filterBy.name, $options: 'i' }
        criteria.name = txtCriteria
    }
    if (filterBy.inStock) {
        // console.log(JSON.parse(filterBy.inStock))
        criteria.inStock = JSON.parse(filterBy.inStock) === true ? true : criteria.inStock
    }
    if (filterBy.labels && filterBy.labels.length) {
        criteria.labels = { $in: filterBy.labels }
    }
    return criteria
}

//Needs refactoring to match board
function _buildSortCriteria({ sortBy }) {
    const criteria = {}
    if (sortBy === 'time') sortBy = 'createdAt'
    if (sortBy === '') return
    criteria[sortBy] = 1
    console.log('criteria', criteria);
    return criteria
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}