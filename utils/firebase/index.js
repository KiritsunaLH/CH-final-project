let admin = require("firebase-admin");

let serviceAccount = require("./config/comision22460-36fe0-firebase-adminsdk-fmpv7-b0c1e86fed.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


module.exports = { db }