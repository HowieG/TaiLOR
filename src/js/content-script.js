// Link external CSS
const globalCssLink = document.createElement("link");
globalCssLink.rel = "stylesheet";
globalCssLink.type = "text/css";
globalCssLink.href = "http://localhost:8001/src/css/global.css";
document.head.appendChild(globalCssLink);

const modalCssLink = document.createElement("link");
modalCssLink.rel = "stylesheet";
modalCssLink.type = "text/css";
modalCssLink.href = "http://localhost:8001/src/css/modal.css";
document.head.appendChild(modalCssLink);

//Img2Txt API
//const apiUrl = "https://api.replicate.com/v1/predictions";

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
	tailorTitle.id = "tailor-title";
	var tailorColoredHTML =
		"t<span style='color: var(--tailor-green);'>ai</span>lor";
	tailorTitle.innerHTML = tailorColoredHTML;
	tailorSelectionContainer.appendChild(tailorTitle);

	const explanatoryTextContainer = document.createElement("div");
	const explanatoryText1 = document.createElement("p");
	explanatoryText1.classList.add("explanatory-text-container");
	explanatoryText1.innerHTML =
		"Click once on the features you <span style='color: var(--tailor-green);'>like</span>";
	explanatoryTextContainer.appendChild(explanatoryText1);
	const explanatoryText2 = document.createElement("p");
	explanatoryText2.classList.add("explanatory-text-container");
	explanatoryText2.innerHTML =
		"Click twice on the features you <span style='color: var(--tailor-red);'>dislike</span>";
	explanatoryTextContainer.appendChild(explanatoryText2);
	tailorSelectionContainer.appendChild(explanatoryTextContainer);

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
	tailorButton.textContent = "tailor";
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
		"elongated couch sinuous lines ivory extruded design striped soft rounded forms modest simple design plush";

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
			button.classList.remove("dislike");
			button.classList.toggle("like");
		});
		button.addEventListener("dblclick", () => {
			button.classList.remove("like");
			button.classList.add("dislike");
		});
		buttonContainer.appendChild(button);
	});
}

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
// TODO. DO NOT REMOVE OR MODAL WILL NEVER OPEN
chrome.runtime.onMessage.addListener(function (request) {
	if (request.action === "openModalView") {
		displayTailorModalView();
		//callImg2Txt();
	}
});

// function callImg2Txt() {
// 	//const apiToken = "YOUR_API_TOKEN"; // TODO
// 	var imageData;
// 	var apiResponse;

// 	fetch(
// 		"https://img1.homary.com/fit-in/800x800/filters:format(webp)/mall/file/2022/07/07/e1f987478b210465f87bba2c2270daa7.jpg"
// 	)
// 		.then((response) => {
// 			return response.blob();
// 		})
// 		.then((blob) => {
// 			const reader = new FileReader();
// 			reader.readAsDataURL(blob);
// 			reader.onloadend = () => {
// 				imageData = reader.result;
// 			};
// 		})
// 		.catch((error) => console.error(error));

// 	const requestBody = {
// 		version:
// 			"a4a8bafd6089e1716b06057c42b19378250d008b80fe87caa5cd36d40c1eda90",
// 		input: { imageData },
// 	};

// 	fetch(apiUrl, {
// 		method: "POST",
// 		mode: "cors",
// 		headers: {
// 			Authorization: "Token ed12da59f40e81d9467aef35ab3fa6b3f273a12e",
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(requestBody),
// 	})
// 		.then((response) => (apiResponse = response.json()))
// 		.then((data) => console.log(data))
// 		.catch((error) => console.error(error));

// 	console.log(apiResponse);
// }
