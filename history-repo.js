// history-repo.js
const connectedKnex = require('./knex-connector');

function getAllHistoryRecords() {
    return connectedKnex('history').select('*');
}

function getHistoryRecordById(id) {
    return connectedKnex('history').select('*').where('id', id).first();
}

function addHistoryRecord(record) {
    return connectedKnex("history").insert(record).returning('id');
}



module.exports = {
    getAllHistoryRecords,
    getHistoryRecordById,
    addHistoryRecord,
}