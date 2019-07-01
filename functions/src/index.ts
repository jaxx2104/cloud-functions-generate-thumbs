import * as functions from "firebase-functions"
import fetch from "node-fetch"
import * as fs from "fs"

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const fetchImage = functions.https.onRequest(async (req, res) => {
  // fetchImage?q=https://jp.vuejs.org/images/logo.png
  const query = req.query.q
  const result = await fetch(query)
  const buffer = await result.buffer()
  if (result.status === 200) {
    fs.writeFileSync("logo.png", buffer, "binary")
  }
  console.log(result.status)
  res.send("Hello from Firebase!")
})
