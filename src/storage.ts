import * as admin from "firebase-admin"

admin.initializeApp()
const bucket = admin.storage().bucket()

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// fetchImage?q=https://jp.vuejs.org/images/logo.png
export const upload = (filepath: string) => {
  bucket.upload(filepath)
}
