
window.onload = () => {
    setTimeout(() => {
        // Hide the address bar!
        window.scrollTo(0, 1);
    }, 0);


    updateProgress();

};

const {
    getSuggestions
} = SEARCHBOT;


const loaded = () => {

    const searchBox = document.getElementById("searchBox");

    searchBox.addEventListener("keyup", askSuggestions);

    searchBox.addEventListener("focus", showSuggestions);
    searchBox.addEventListener("blur", hideSuggestions);
   
}


const showSuggestions = () => {
    const suggestionsUl = document.getElementById("suggestionsWrapper");
    suggestionsUl.classList.remove("hide");    
}

const hideSuggestions = () => {
    const suggestionsUl = document.getElementById("suggestionsWrapper");
    suggestionsUl.classList.add("hide");    
}

var timeOut, timer = 1000;


const askSuggestions = evt => {
    const text = (evt.target.value).replace(/\s+/g,' ').trim();
    const wordsArr = text.split(" ");
    const noOfSpaces = wordsArr.length;
    let latestWord = wordsArr[noOfSpaces - 1];
    if(!latestWord) {
        latestWord = wordsArr[noOfSpaces - 2];
    }

    //clear the timeout if any key is pressed during the wait to optimize API calls.
    clearTimeout(timeOut);

    timeOut = setTimeout(() => {
        getSuggestions(latestWord)
            .then(data => {
                populateSuggestions(data);
        });
    }, timer);
    
}

const populateSuggestions = suggestionsArray => {
    const suggestionsUl = document.getElementById("suggestionsWrapper");
    suggestionsUl.innerHTML = "";
    suggestionsArray.forEach(suggestion => {
        const suggestionLi = document.createElement("li");
        suggestionLi.classList.add("suggestion");
        suggestionLi.textContent = suggestion;
        suggestionsWrapper.appendChild(suggestionLi);
    });
}

const updateProgress = () => {
    const imagePromises = Array.from(document.getElementsByTagName('img'))
        .filter(image => !!image.src)
        .map(image => new Promise(resolve => { let i = new Image(); i.src = image.src; i.onload = resolve }));

    Promise.all(imagePromises).then(() => {
        loaded();
    });
}