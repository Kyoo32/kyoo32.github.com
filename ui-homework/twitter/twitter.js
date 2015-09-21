var i = 0;

function init(){
	document.addEventListener("scroll", eventByScrollPoint);
	document.addEventListener("click", favorite);
	document.addEventListener("keyup", blueButtonAndCount);
}

function eventByScrollPoint(){
	var scrollTop = document.body.scrollTop;
	var scrollHeight = document.body.scrollHeight;
	var height = window.innerHeight;

	console.log(height);
	console.log(scrollHeight-scrollTop);
	if(i>100) return;
	if(height >= scrollHeight-scrollTop - 100){
		loadJson();
	}
}

function addContentBox(){

	var newDiv = document.createElement('div');
	newDiv.classList.add('tweetted-content-wrapper');
	var newName = document.createElement('div');
	newName.classList.add('profile-img-box');
	var nameImg = document.createElement('img');
	nameImg.classList.add('profile-img');
	nameImg.src ="./taegon.png";
	newName.appendChild(nameImg);
	var newContent = document.createElement('div');
	newContent.classList.add('content-box');
	var newIconbox = document.createElement('div');
	newIconbox.classList.add("icons-box");
	var newTweet = document.createElement('div');
	newTweet.classList.add("tweet-icon");
	var tweetImg = document.createElement('img');
	tweetImg.src = "twitter.png";
	newTweet.appendChild(tweetImg);
	var newFavorite = document.createElement('div');
	newFavorite.classList.add("favorite-icon");
	var favoriteImg = document.createElement('img');
	favoriteImg.src = "star-full.png";
	newFavorite.appendChild(favoriteImg);

	newIconbox.appendChild(newTweet);
	newIconbox.appendChild(newFavorite);

	newDiv.appendChild(newName);
	newDiv.appendChild(newContent);
	newDiv.appendChild(newIconbox);

	var wrapper = document.getElementById('main-section');
	wrapper.appendChild(newDiv);

	return newContent;
}

function loadJson(){
	window.onscroll = null;
	i++;
	var actual_JSON;

	console.log("check" + i);
    var xobj = new XMLHttpRequest();
    var pageName = 'http://api.taegon.kim/posts/page/' +i;
    console.log(pageName);
    xobj.open('GET', pageName, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
		   actual_JSON = JSON.parse(xobj.responseText);
		   for(var j=0;j<10;j++){
		   		fillContext(addContentBox(), actual_JSON.posts[j]);
		   }
		   window.onscroll = eventByScrollPoint;
	    }
	}  
	xobj.send(null);

	return actual_JSON;

}

function fillContext(contentDiv, contentset){

	var out = "";
	var content = contentDiv//document.querySelector(".content-box");


	out = "<br> <span class='name'>" + contentset.username +
			"</span><br>" + contentset.content;
	content.innerHTML = out;

	
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


function textAreaBigger(evt){
	console.log("done3");
	console.log(evt);
	if(evt.name !=="content") return;
	evt.dataset.focus = "true";
	evt.style.height = "100px";
	var wrapper = evt.parentNode.parentNode.parentNode;
	wrapper.style.height = "160px";
	var button = wrapper.querySelector("button");
	button.style.visibility = "visible";
}

function textAreaInit(evt){
	console.log("done4");
	console.log(evt);
	console.log(evt.name);
	if(evt.name !=="content") return;
	if(evt.value.length != 0) return;

	evt.dataset.focus = "false";
	evt.style.height = "35px";
	var wrapper = evt.parentNode.parentNode.parentNode;
	wrapper.style.height = "60px";
	var button = wrapper.querySelector("button");
	button.style.visibility = "hidden";
}


init();