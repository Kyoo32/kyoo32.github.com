

function init(){
	/*console.log("what");*/
	document.addEventListener("click", favorite);
	document.addEventListener("keyup", blueButtonAndCount);
}

function favorite(evt){
	var target = evt.target.parentNode;
	var targetImg = target.querySelector("img");

 	/*
 	console.log(target);
	console.log(target.className);
	*/
	if(target.className != "favorite-icon"){
		console.log("done0");
		return;
	}

	console.log(target.dataset.clicked);
	if(target.dataset.clicked === "false"){
		target.dataset.clicked = "true";
		targetImg.src = "./star-clicked.png"
	} else {
		target.dataset.clicked = "false";
		targetImg.src = "./star-full.png"
	}
}


function blueButtonAndCount(){
	console.log("haha");
	var textArea = document.querySelector("textarea");
	var button = document.querySelector("button");
	var count = document.querySelector("#char-count");

	if(textArea.dataset.focus == "false") {
		console.log(textArea.dataset.focus);
		return;
	}
	if(textArea.value.length === 0) {
		console.log(button.style.backgroundColor);
		if(button.style.backgroundColor === "rgb(0, 132, 180)")
			button.style.backgroundColor = "grey";
		count.innerHTML = 300;
		return; 
	}
	
	console.log(button);
	button.style.backgroundColor = "#0084B4";
	count.innerHTML = 300 - textArea.value.length;
}


init();