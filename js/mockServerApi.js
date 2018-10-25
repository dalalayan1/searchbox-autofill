// ================================= Mock Server Start =============================

const APIWRAPPER = {
    FAILURE_COEFF: 10,
    MAX_SERVER_LATENCY: 200,

    getRandomBool: function (n) {
    var maxRandomCoeff = 1000;
    if (n > maxRandomCoeff) n = maxRandomCoeff;
    return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
    },

    getSuggestions: function (text) {
    var pre = 'pre';
    var post = 'post';
    var results = [];
    if (APIWRAPPER.getRandomBool( 2)) {
        results.push(pre + text);
    }
    if (APIWRAPPER.getRandomBool( 2)) {
        results.push(text);
    }
    if (APIWRAPPER.getRandomBool( 2)) {
        results.push(text + post);
    }
    if (APIWRAPPER.getRandomBool( 2)) {
        results.push(pre + text + post);
    }
    return new Promise((resolve, reject) => {
        var randomTimeout = Math.random() * this.MAX_SERVER_LATENCY;
        setTimeout(() => {
        if (APIWRAPPER.getRandomBool( this.FAILURE_COEFF)) {
            reject();
        } else {
            resolve(results);
        }
        }, randomTimeout);
    });
    }
}

var SEARCHBOT = SEARCHBOT || {
    getRandomBool: APIWRAPPER.getRandomBool,
    getSuggestions: APIWRAPPER.getSuggestions
};
// ================================= Mock Server End =============================