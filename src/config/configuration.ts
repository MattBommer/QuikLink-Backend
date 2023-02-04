export const prodConfig = () => ({
    database: {
        type: process.env.DB_TYPE,
        host: process.env.HOSTNAME,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    },
    ...sharedConfig()
})

export const localConfig = () => ({
    database: {
        database: 'quiklink.sqlite3'
    },
    ...sharedConfig()
})

const sharedConfig = () => ({
    tokenCache: {
        port: process.env.CACHE_PORT,
        host: process.env.CACHE_HOST,
        options: {
            password: process.env.CACHE_PASSWORD
        }
    },
    refreshJwtSecret: process.env.REFRESH_JWT_SECRET,
    accessJwtSecret: process.env.ACCESS_JWT_SECRET
})