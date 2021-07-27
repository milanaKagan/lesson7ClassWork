// account-repo.js
const connectedKnex = require('./knex-connector');

function getAllAccounts() {
    return connectedKnex('accounts').select('*');
}

function getAccountById(id) {
    return connectedKnex('accounts').select('*').where('id', id).first();
}

function addAccount(product) {
    return connectedKnex("accounts").insert(product).returning('id');
}

function updateAccount(account, id) {
    return connectedKnex("accounts").where('id', id).update(account);
}

function deleteAccount(id) {
    return connectedKnex("accounts").where('id', id).del()
}

module.exports = {
    getAllAccounts,
    getAccountById,
    addAccount,
    updateAccount,
    deleteAccount
}