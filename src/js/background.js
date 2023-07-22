chrome.runtime.onInstalled.addListener(function () {
	if (chrome.contextMenus) {
		chrome.contextMenus.create({
			id: "tailorContextMenu",
			title: "TaiLOR",
			contexts: ["image"],
			// icons: {
			// 	16: "../../assets/favicon-16x16.png",
			// 	32: "../../assets/favicon-32x32.png",
			// }
		});
	}
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	if (info.menuItemId === "tailorContextMenu") {
		console.log(tab);
		console.log(chrome.tabs);
		chrome.tabs.sendMessage(tab.id, {
			action: "openModalView",
			imageUrl: info.srcUrl,
		});
	}
});
