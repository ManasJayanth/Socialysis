var nlp = require('./nlp');

exports.createJSON = function (text) {
    var wc = nlp.getNounCount(nlp.getCommonNouns(text));
    console.log(JSON.stringify(wc));
};
