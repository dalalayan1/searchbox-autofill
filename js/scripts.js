
window.onload = () => {
    init();

};

const {
    getSuggestions
} = SEARCHBOT;

/**
 * init - entry point
 */
const init = () => {

    const searchBox = document.getElementById("searchBox");

    searchBox.addEventListener("keyup", askSuggestions);

    searchBox.addEventListener("focus", showSuggestions);
    searchBox.addEventListener("blur", hideSuggestions);
   
}

/**
 * showSuggestions - shows the suggestions dropdown
 */
const showSuggestions = () => {
    const suggestionsUl = document.getElementById("suggestionsWrapper");
    suggestionsUl.classList.remove("hide");    
}

/**
 * hideSuggestions - hides the suggestions dropdown
 */
const hideSuggestions = () => {
    const suggestionsUl = document.getElementById("suggestionsWrapper");
    suggestionsUl.classList.add("hide");    
}

/**
 * askSuggestions - makes the dummy API call to get suggestions
 * @param {object} evt - event object
 */
const askSuggestions = evt => {
    const text = (evt.target.value).replace(/\s+/g,' ').trim();
    const wordsArr = text.split(" ");
    const noOfSpaces = wordsArr.length;
    let latestWord = wordsArr[noOfSpaces - 1];
    if(!latestWord) {
        latestWord = wordsArr[noOfSpaces - 2];
    }


    let timeOut,
        timer = 1000;
    
    //clear the timeout if any key is pressed during the wait to optimize API calls.
    clearTimeout(timeOut);

    //restart the timer
    timeOut = setTimeout(() => {
        getSuggestions(latestWord)
            .then(data => {
                populateSuggestions(data);
        });
    }, timer);
    
}

/**
 * populateSuggestions - populates DOM element with the suggestions
 * @param {array} suggestionsArray - array of suggestions from API
 */
const populateSuggestions = suggestionsArray => {
    const suggestionsUl = document.getElementById("suggestionsWrapper");
    suggestionsUl.innerHTML = "";
    suggestionsArray.forEach((suggestion, ind) => {
        const suggestionLi = document.createElement("li");
        suggestionLi.tabIndex = ind;
        suggestionLi.classList.add("suggestion");
        suggestionLi.textContent = suggestion;
        suggestionsWrapper.appendChild(suggestionLi);
    });
}