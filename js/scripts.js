
window.onload = () => {
    init();

};

const {
    getSuggestions
} = SEARCHBOT;
let latestSearchWord = "";

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
 * askSuggestions - gets the input value and processes it for fetching data
 * @param {object} evt - event object
 */
const askSuggestions = evt => {
    //remove redundant white spaces
    const text = (evt.target.value).replace(/\s+/g,' ').trim();
    const wordsArr = text.split(" ");
    const noOfSpaces = wordsArr.length;
    let latestWord = wordsArr[noOfSpaces - 1];
    if(!latestWord) {
        latestWord = wordsArr[noOfSpaces - 2];
    }

    if (latestWord) {
        fetchAPIdata(latestWord);
    }
    
}

/**
 * fetchAPIdata - makes the dummy API call to get suggestions
 * @param {string} searchWord - search parameter to fetch data
 */
const fetchAPIdata = searchWord => {
    let timeOut,
        timer = 2000;

    //clear the timeout if any key is pressed during the wait to optimize API calls.
    clearTimeout(timeOut);

    //restart the timer
    timeOut = setTimeout(() => {
        latestSearchWord = searchWord;
        getSuggestions(searchWord)
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
        const startIdx = suggestion.indexOf(latestSearchWord),
            beforeText = suggestion.slice(0,startIdx),
            afterText = suggestion.slice(beforeText.length+latestSearchWord.length, suggestion.length),
            suggestionLi = document.createElement("li");
        suggestionLi.tabIndex = ind;
        suggestionLi.classList.add("suggestion");
        suggestionLi.innerHTML = `${beforeText}<b>${latestSearchWord}</b>${afterText}`;
        suggestionsWrapper.appendChild(suggestionLi);
    });

}

