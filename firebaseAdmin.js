const admin = require('firebase-admin');
const serviceAccount = require('./javed-api-11b15-firebase-adminsdk-o1c61-9834ac2dfe.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
module.exports = db;