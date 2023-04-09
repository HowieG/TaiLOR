// Link external CSS
const modalCssLink = document.createElement("link");
modalCssLink.rel = "stylesheet";
modalCssLink.type = "text/css";
modalCssLink.href = "http://localhost:8001/src/modal-view/modal.css";
document.head.appendChild(modalCssLink);

function displayTailorModalView() {
	var modal = document.querySelector(".tailor-modal");

	if (modal) {
		modal.style.display = "block";
	} else {
		createModalView();
	}
}

function createModalView() {
	const modal = document.createElement("div");
	modal.classList.add("tailor-modal");
	const modalContent = document.createElement("div");
	modalContent.classList.add("tailor-modal-content");

	// Close modal button
	const modalClose = document.createElement("span");
	modalClose.classList.add("tailor-modal-close");
	modalClose.textContent = "\u00D7";
	modalContent.appendChild(modalClose);

	const sourceImageContainer = document.createElement("div");
	sourceImageContainer.id = "source-image-container";
	const sourceImg = document.createElement("img");
	sourceImg.id = "source-img";
	sourceImg.src = "http://localhost:8000/assets/source-couch1.webp";
	sourceImageContainer.appendChild(sourceImg);
	modalContent.appendChild(sourceImageContainer);

	const tailorSelectionContainer = document.createElement("div");
	tailorSelectionContainer.id = "tailor-selection-container";

	const tailorTitle = document.createElement("h1");
	tailorTitle.textContent = "TaiLOR";
	tailorTitle.id = "tailor-title";
	tailorSelectionContainer.appendChild(tailorTitle);

	const buttonContainer = document.createElement("div");
	buttonContainer.id = "button-container";
	tailorSelectionContainer.appendChild(buttonContainer);

	const textarea = document.createElement("textarea");
	textarea.id = "tailor-input-text-area";
	textarea.placeholder =
		"Enter anything else you'd like to see in your final product";
	tailorSelectionContainer.appendChild(textarea);

	const tailorButton = document.createElement("button");
	tailorButton.id = "tailor-button";
	tailorButton.textContent = "TaiLOR";
	tailorSelectionContainer.appendChild(tailorButton);

	// When the user clicks the close button, close the modal
	modalClose.addEventListener("click", function () {
		modal.style.display = "none";
	});

	// When the user clicks anywhere outside of the modal, close it
	// window.addEventListener("click", function (event) {
	// 	if (event.target != modal) {
	// 		modal.style.display = "none";
	// 	}
	// });

	modalContent.appendChild(tailorSelectionContainer);
	modal.appendChild(modalContent);
	document.body.appendChild(modal);

	// Define stop words
	const stopWords = [
		"a",
		"an",
		"and",
		"the",
		"in",
		"on",
		"at",
		"to",
		"for",
		"with",
		"of",
		"from",
		"is",
	];

	const hardCodedImageDescription =
		"elongated couch sinuous lines ivory extruded design striped soft rounded forms modest simple design";

	const strippedDescriptionTokens = hardCodedImageDescription
		.toLowerCase()
		.match(/\b\w+\b/g)
		.filter((token) => !stopWords.includes(token));

	buttonContainer.innerHTML = "";
	strippedDescriptionTokens.forEach((token) => {
		const button = document.createElement("button");
		button.textContent = token;
		button.classList.add("btn");
		button.addEventListener("click", () => {
			button.classList.remove("red");
			button.classList.toggle("green");
		});
		button.addEventListener("dblclick", () => {
			button.classList.remove("green");
			button.classList.add("red");
		});
		buttonContainer.appendChild(button);
	});
}

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
// TODO. DO NOT REMOVE OR MODAL WILL NEVER OPEN
chrome.runtime.onMessage.addListener(function (request) {
	if (request.action === "openModalView") {
		displayTailorModalView();
		console.log("Modal view opened!");
	}
});
