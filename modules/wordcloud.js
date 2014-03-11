var nlp = require('./nlp'),
    fs = require('fs');

exports.createJSON = function (text) {
    var wc = nlp.getNounCount(nlp.getCommonNouns(text));

    function fsCallback(err) {
        if (err) {
            throw err;
        }
        console.log('It\'s saved!');
    }
    fs.writeFile(__dirname + '/../public/javascripts/wordcloud-data.json',
                 JSON.stringify(wc),
                 fsCallback);
};
