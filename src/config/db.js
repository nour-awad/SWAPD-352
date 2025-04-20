const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

async function initializeDB() {
  db.defaults({ users: [], refreshTokens: [], passwordResetTokens: [] }).write()
}

module.exports = { db, initializeDB }