require('dotenv').config();

module.exports.Config = {
    port: process.env.PORT,
    mongoAtlasURI: `${process.env.MONGO_ATLAS}`,
}