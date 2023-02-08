const fs = require('fs')
const crypto = require('crypto')

const envVariables = {
    type: 'sqlite',
    database: 'quiklink.sqlite3',
    refresh_jwt_cache_port: '6379',
    refresh_jwt_cache_host: 'localhost',
    refresh_jwt_secret: crypto.randomUUID(),
    access_jwt_secret: crypto.randomUUID(),
}

const entries = Object.entries(envVariables)
const content = entries.map((entry) => {
    return `${entry[0].toUpperCase()}=${entry[1]}`
}).join("\n")

fs.writeFile('local.env', content, (err) => {
    if (err) {
        console.log(err)
    }
})