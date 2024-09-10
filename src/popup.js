function writeToClipboard(data) {
  navigator.clipboard
    .writeText(data)
    .then(() => {
      alert("Copied: " + data);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

document.getElementById("copyBtn").addEventListener("click", async function () {
  const title = await getPageTitle();

  writeToClipboard(title);
});

document
  .getElementById("copyAllBtn")
  .addEventListener("click", async function () {
    const title = await getPageTitle();
    const url = await getPageUrl();

    const titleAndUrl = `${title}\n${url}`;

    writeToClipboard(titleAndUrl);
  });

document
  .getElementById("copyMdBtn")
  .addEventListener("click", async function () {
    const title = await getPageTitle();
    const url = await getPageUrl();

    const markdown = `[${title}](${url})`;

    writeToClipboard(markdown);
  });
