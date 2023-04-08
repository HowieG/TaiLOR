// Define a function that will create a modal view
function createModalView() {
	// Create a new div element to hold the modal view
	const modal = document.createElement("div");

	// Add some content to the modal view
	modal.innerHTML = "<h2>Hello World!</h2><p>This is a modal view!</p>";

	// Add some styles to the modal view
	modal.style.position = "fixed";
	modal.style.top = "50%";
	modal.style.left = "50%";
	modal.style.transform = "translate(-50%, -50%)";
	modal.style.backgroundColor = "#fff";
	modal.style.padding = "20px";
	modal.style.borderRadius = "10px";
	modal.style.boxShadow = "0px 0px 10px 2px rgba(0,0,0,0.5)";

	// Add the modal view to the body of the page
	document.body.appendChild(modal);

	// Add an event listener to the modal view that will remove it from the page when clicked
	modal.addEventListener("click", () => {
		document.body.removeChild(modal);
	});
}

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
chrome.runtime.onMessage.addListener(function (request, tab) {
	console.log(tab);
	if (request.action === "openModalView") {
		createModalView();
		console.log("Modal view opened!");
	}
});
