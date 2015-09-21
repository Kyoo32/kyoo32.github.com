

function init(){
	document.addEventListener("click", favorite);
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

	console.log(targetImg.src);
	if(targetImg.src == "file:///Users/katekyuwon/my_git_page/kyoo32.github.com/ui-homework/twitter/star-clicked.png"){
		targetImg.src = "file:///Users/katekyuwon/my_git_page/kyoo32.github.com/ui-homework/twitter/star-full.png"
	} else if(targetImg.src == "file:///Users/katekyuwon/my_git_page/kyoo32.github.com/ui-homework/twitter/star-full.png"){
		targetImg.src = "file:///Users/katekyuwon/my_git_page/kyoo32.github.com/ui-homework/twitter/star-clicked.png"
	}

}


init();