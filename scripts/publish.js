import webStore from "chrome-webstore-upload";
import fs from "fs";

const store = webStore({
  extensionId: process.env.EXTENSION_ID,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
});

console.log(store);

const copyTitleExtensionZip = fs.createReadStream(
  "./build/copy-title-extension.zip"
);
// response is a Resource Representation
// https://developer.chrome.com/webstore/webstore_api/items#resource
const uploadResponse = await store.uploadExisting(copyTitleExtensionZip);
console.log(uploadResponse);

// response is documented here:
// https://developer.chrome.com/webstore/webstore_api/items#publish
const publishResponse = await store.publish();
console.log(publishResponse);