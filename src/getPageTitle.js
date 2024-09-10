function getPageTitle() {
  return new Promise((resolve, reject) => {
    // 检查是否在 content script 环境
    if (typeof document !== "undefined" && document.title) {
      if (document.title !== "Copy Page Title") {
        resolve(document.title);
        return;
      }
    }

    // 检查是否可以使用 tabs API
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs[0] && tabs[0].title) {
          resolve(tabs[0].title);
        } else {
          reject(new Error("无法获取活动标签页信息"));
        }
      });
      return;
    }

    // 如果以上方法都不可用，尝试使用 runtime.sendMessage 向 content script 请求标题
    if (
      typeof chrome !== "undefined" &&
      chrome.runtime &&
      chrome.runtime.sendMessage
    ) {
      chrome.runtime.sendMessage({ action: "getPageTitle" }, (response) => {
        if (response && response.title) {
          resolve(response.title);
        } else {
          reject(new Error("无法通过消息获取页面标题"));
        }
      });
      return;
    }

    // 如果所有方法都失败
    reject(new Error("无法在当前环境中获取页面标题"));
  });
}

// 在 content script 中添加消息监听器
if (
  typeof chrome !== "undefined" &&
  chrome.runtime &&
  chrome.runtime.onMessage
) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getPageTitle") {
      sendResponse({ title: document.title });
    }
    return true; // 保持消息通道开放
  });
}
