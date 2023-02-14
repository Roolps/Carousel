const carouselConfig = {
    "elements": {
        "wrap-name": "cards-wrap", // ID attribute of the wrapper containing the cards.
        "card-name": "card" // Classname of the cards inside the wrapper you want to animate
    },
    "animations": {
        "left-pull": "anim-left", // CSS class to apply when the item moves from the center to the left
        "right-pull": "anim-right" // CSS class to apply when the item moves from the center to the right
    },
    "delay": 1000 // The ms time it takes for CSS to complete it's animation - taken from the 'transition' property
}


/*
Progress prevents you swiping twice simultaneously, it waits
till the anim is finished then allows the user to press again.
*/
var progress = false;

function carousel(method) {
    if (!progress) {
        progress = true;
        var carouselWrap = document.getElementById(carouselConfig["elements"]["wrap-name"]);
        if (method == "+") {
            var toleft = carouselWrap.getElementsByClassName(carouselConfig["elements"]["card-name"])[1];
            var fromright = carouselWrap.getElementsByClassName(carouselConfig["elements"]["card-name"])[2];
            toleft.classList.add(carouselConfig["animations"]["left-pull"]);
            fromright.classList.remove(carouselConfig["animations"]["right-pull"]);
            
            var temp = carouselWrap.getElementsByClassName(carouselConfig["elements"]["card-name"])[0];
            temp.classList.remove(carouselConfig["animations"]["left-pull"]);
            temp.classList.add(carouselConfig["animations"]["right-pull"]);

            setTimeout(() => {
                carouselWrap.removeChild(temp);
                carouselWrap.appendChild(temp);
                progress = false;
            }, carouselConfig["delay"]);
        } else {            
            var toRight = carouselWrap.getElementsByClassName(carouselConfig["elements"]["card-name"])[1];
            var fromLeft = carouselWrap.getElementsByClassName(carouselConfig["elements"]["card-name"])[0];
            toRight.classList.add(carouselConfig["animations"]["right-pull"]);
            fromLeft.classList.remove(carouselConfig["animations"]["left-pull"]);
            
            var temp =  carouselWrap.getElementsByClassName(carouselConfig["elements"]["card-name"])[carouselWrap.getElementsByClassName(carouselConfig["elements"]["card-name"]).length - 1];
            temp.classList.remove(carouselConfig["animations"]["right-pull"]);
            temp.classList.add(carouselConfig["animations"]["left-pull"]);

            setTimeout(() => {
                carouselWrap.removeChild(temp);
                var bulk = carouselWrap.innerHTML;

                carouselWrap.innerHTML = "";
                carouselWrap.appendChild(temp);
                carouselWrap.innerHTML += bulk;
                progress = false;
            }, carouselConfig["delay"]);
        }
    }
}
