const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const oauth2Client = new google.auth.OAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({ version: "v3", auth: oauth2Client });

const filePath = path.join(__dirname, "thunder.jpg");

async function uploadFile() {
  try {
    const res = await drive.files.create({
      requestBody: {
        name: "thun.jpg",
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath),
      },
    });
    console.log(res.data, res.status);
  } catch (ex) {
    console.log(ex.message);
  }
}

// uploadFile();

async function deleteFile() {
  try {
    const response = await drive.files.delete({
      fileId: "19KHFv6cFvBtgdSlmloKK5TtAiVAB-VXg",
    });

    console.log(response.data, response.status);
  } catch (ex) {
    console.log(ex.message);
  }
}

// deleteFile();

async function getURL() {
  try {
    const fileId = "1tStz543KgxyyffXllKdkxkuF34K8ptg3";

    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const response = await drive.files.get({
      fileId,
      fields: "webViewLink, webContentLink",
    });

    console.log(response.data, response.status);
  } catch (ex) {
    console.log(ex.message);
  }
}

// getURL();
