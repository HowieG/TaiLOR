chrome.runtime.onInstalled.addListener(function () {
	chrome.contextMenus.create({
		id: "tailorContextMenu",
		title: "Open Modal View",
		contexts: ["all"],
	});
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	if (info.menuItemId === "tailorContextMenu") {
		console.log(tab);
		console.log(chrome.tabs);
		chrome.tabs.sendMessage(tab.id, { action: "openModalView" });
	}
});
