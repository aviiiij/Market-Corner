module.exports = {
    // load atlas url and jwt secret key
    database: `${process.env.mongourl}`, 
    secret: `${process.env.secret}`
}