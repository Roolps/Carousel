// CSS class used by the cards in the carousel
const cardName = "card";
// Time taken for cards to complete their animation cycle, same as the transition time in the css.
const animDelay = 1000;

/*
Progress prevents you swiping twice simultaneously, it waits
till the anim is finished then allows the user to press again.
*/
var progress = false;

function carousel(method) {
    if (!progress) {
        progress = true;
        // Gets the wrap that contains all of the carousel cards inside
        var carouselWrap = document.getElementById("cards-wrap");
        if (method == "+") {
            var toleft = carouselWrap.getElementsByClassName(cardName)[1];
            var fromright = carouselWrap.getElementsByClassName(cardName)[2];
            toleft.classList.add("anim-left");
            fromright.classList.remove("anim-right");
            
            var temp = carouselWrap.getElementsByClassName(cardName)[0];
            temp.classList.remove("left-anim");
            temp.classList.add("right-anim");

            setTimeout(() => {
                carouselWrap.removeChild(temp);
                carouselWrap.appendChild(temp);
                progress = false;
            }, animDelay);
        } else {            
            var toRight = carouselWrap.getElementsByClassName(cardName)[1];
            var fromLeft = carouselWrap.getElementsByClassName(cardName)[0];
            toRight.classList.add("right-anim");
            fromLeft.classList.remove("left-anim");
            
            var temp =  carouselWrap.getElementsByClassName(cardName)[carouselWrap.getElementsByClassName(cardName).length - 1];
            temp.classList.remove("right-anim");
            temp.classList.add("left-anim");

            setTimeout(() => {
                carouselWrap.removeChild(temp);
                var bulk = carouselWrap.innerHTML;

                carouselWrap.innerHTML = "";
                carouselWrap.appendChild(temp);
                carouselWrap.innerHTML += bulk;
                progress = false;
            }, animDelay);
        }
    }
}
