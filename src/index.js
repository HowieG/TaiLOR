chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "TaiLOR",
    contexts: ["page"],
    id: "tailorRightClickListener",
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "tailorRightClickListener") {
  }
});
