// Initialize Firebase
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

//Retrieve the temperature from the request and stick it to firebase along with timestamp.
exports.addTemperature = functions.https.onRequest(async (req, res) => {
  // Grab the temperature parameter.
  const temperature = req.query.temp;
  // Push the new temperature to Firebase database
  const writeResult = await admin.firestore().collection("temperatures").add({
    temperature,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });
  // Send back a message that we've successfully logged the temperature.
  res.json({ result: `New temperature logged.` });
});
