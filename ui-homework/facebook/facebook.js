var i = 0;
var c = 0;

function init(){
	window.onscroll = eventByScrollPoint;
	document.addEventListener("click", clickButton);
	document.addEventListener("keyup", focusContent);
}


function eventByScrollPoint(){
	var ScrollPoint = calScrollPoint();
	console.log(ScrollPoint);
	if(ScrollPoint > 0.2 && i<=5){
		addContentBox();
		addContentBox();
		addContentBox();
		loadJson();
	}
	else if(i>5){
		return;
	}
}

//scroll infinitly
function addContentBox(){	
	//if(document.body.scrollHeight - document.body.scrollTop < 1000) {
	//if(window.innerHeight - window.scrollY < 300) {
	
	var newDiv = document.createElement('div');
	newDiv.classList.add('content-box');
	var newName = document.createElement('div');
	newName.classList.add('content-name');
	var newContent = document.createElement('div');
	newContent.classList.add('content-content');
	
	//갯수 
	var newCount = document.createElement('div');
	newCount.classList.add('button-count');

	var newLike = document.createElement('span');
	newLike.classList.add("like-count");
	newLike.textContent = 2;
	newCount.appendChild(document.createTextNode("좋아요 "));
	newCount.appendChild(newLike);
	newCount.appendChild(document.createTextNode('개 '));

	var newComment = document.createElement('span');
	newComment.classList.add("comment-count");
	newComment.textContent = 3;
	newCount.appendChild(document.createTextNode("댓글 "));
	newCount.appendChild(newComment);
	newCount.appendChild(document.createTextNode('개 '));

	var newShare = document.createElement('span');
	newShare.classList.add("share-count");
	newShare.textContent = 4;
	newCount.appendChild(document.createTextNode("공유 "));
	newCount.appendChild(newShare);
	newCount.appendChild(document.createTextNode('개 '));
	
	//버튼
	var newButton = document.createElement('div');
	newButton.classList.add('content-button');

	var likeImg = document.createElement('img');
	likeImg.src="thumbs-up.svg";
	var newLikeB = document.createElement('span');
	newLikeB.classList.add("like-button");
	newLikeB.textContent = '좋아요 ';
	newButton.appendChild(likeImg);
	newButton.appendChild(newLikeB);

	var commentImg = document.createElement('img');
	commentImg.src="comment.svg";
	var newCommentB = document.createElement('span');
	newCommentB.classList.add("comment-button");
	newCommentB.textContent = '댓글달기 ';
	newButton.appendChild(commentImg);
	newButton.appendChild(newCommentB);

	var shareImg = document.createElement('img');
	shareImg.src="mail-forward.svg";
	var newShareB = document.createElement('span');
	newShareB.classList.add("share-button");
	newShareB.textContent = '공유하기 ';
	newButton.appendChild(shareImg);
	newButton.appendChild(newShareB);

	newDiv.appendChild(newName);
	newDiv.appendChild(newContent);
	newDiv.appendChild(newCount);
	newDiv.appendChild(newButton);
	
	var wrapper = document.getElementById('content-wrapper');
	wrapper.appendChild(newDiv);
		
}

function calScrollPoint(){
	var top = document.body.scrollTop;
	var clientH = document.body.clientHeight;
	var scrollH = document.body.scrollHeight;

	var result = top / (scrollH - clientH);
	return result;

}

//load Json like ajax
function loadJson(){
	window.onscroll = null;

	//if(window.innerHeight - window.scrollY < 300) {
	i += 1;
	console.log("i :" + i + "and type: " +typeof(i));
	if(i>5){
		console.log("No More Data");
		return;
	}
	
	//console.log(document.body.scrollHeight - document.body.scrollTop);
	//load five content-box from json
	console.log("check");
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    var pageName = pageName = 'page' + i + '.json';
    console.log(pageName);
    xobj.open('GET', pageName, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
		    var actual_JSON = JSON.parse(xobj.responseText);
		    console.log(actual_JSON);
			fillContext(actual_JSON);
		    window.onscroll = eventByScrollPoint;
	    }
	}  
	xobj.send(null);

}

//click button and delegate event to count text and icon style
function clickButton(evt){
	var target = evt.target;
		tagName = target.tagName;

	if(tagName==="SPAN"){
		if(target.style.color === ""){
			target.style.color = "blue";

		}
		else if(target.style.color === "blue"){
			target.style.color = "";
		}
	}

	if(target.className === "like-button"){
		var count = target.parentNode.parentNode.querySelector(".like-count");
		var savedCount = parseInt(count.innerHTML);
		var targetImg = target.parentNode.parentNode.querySelector(".content-button img:first-child");	

		console.log(targetImg);
		if(target.style.color ===""){
			savedCount -= 1;
			targetImg.style.fill = "";
		}
		else if(target.style.color ==="blue"){
			savedCount +=1;
			targetImg.style.fill = "blue";
		}	
		count.innerHTML = savedCount.toString();	

	} else if(target.className === "comment-button"){
		var count = target.parentNode.parentNode.querySelector(".comment-count");
		var savedCount = parseInt(count.innerHTML);
		if(target.style.color === ""){
			savedCount -= 1;
		}
		else if(target.style.color ==="blue"){
			savedCount += 1;
		}	
		count.innerHTML = savedCount.toString();
	} else if(target.className === "share-button"){
		var count = target.parentNode.parentNode.querySelector(".share-count");
		var savedCount = parseInt(count.innerHTML);
		if(target.style.color ===""){
			savedCount -= 1;
		}
		else if(target.style.color ==="blue"){
			savedCount +=1;
		}	
		count.innerHTML = savedCount.toString();
	}

}

//fill the content with the json page
function fillContext(jsonPage){

	var out = "";
	var i;
	var names = document.querySelectorAll(".content-name");
	var contents = document.querySelectorAll(".content-content");
	var likeCounts = document.querySelectorAll(".like-count");
	var commentCounts = document.querySelectorAll(".comment-count");
	var shareCounts = document.querySelectorAll(".share-count");
	
	console.log(names);
	for(i=0; i<jsonPage.length;i++){
		out = jsonPage[i].name.first + " " +jsonPage[i].name.last;
		names[i+2].innerHTML = out;
		out = jsonPage[i].content;
		contents[i+2].innerHTML = out;	
		out = jsonPage[i].likeCount;
		likeCounts[i+2].innerHTML = out;
		out = jsonPage[i].commentCount;
		commentCounts[i+2].innerHTML = out;
		out = jsonPage[i].shareCount;
		shareCounts[i+2].innerHTML = out;
		//if(jsonPage[i].doesLike === true);
	}
}

//foucus Content with key
function focusContent(e){
	
	var target = document.querySelectorAll('.content-box');
	console.log(target);
	target[c].classList.remove('onFocus');	
	if(e.keyCode == 74){ //j key
		c += 1;
	} else if(e.keyCode == 75){ //k key
		if(c != 0){
			c -= 1;
		}
	}
	target[c].classList.add('onFocus');
	window.scrollTo(target[c].left, target[c].top);
}


init();
