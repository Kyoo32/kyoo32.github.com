
        var currentState;
        
        document.onreadystatechange = function () {
            if (document.readyState !== currentState) {
            	currentState = document.readyState;
                console.log("state: " + currentState);
            }
        }

        document.addEventListener("DOMContentLoaded", function(){
            console.log("DOMContentLoaded");
        });
        
        window.addEventListener("load", function(){
            console.log("load");
        })
