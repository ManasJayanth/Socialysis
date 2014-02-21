var nlp = require('./nlp'),
    fs = require('fs');

exports.createJSON = function (text) {
    var wc = nlp.getNounCount(nlp.getCommonNouns(text));
    fs.writeFile(__dirname + '/../public/javascripts/wordcloud-data.json',
                 JSON.stringify(wc), function (err) {
                     if (err) throw err;
                     console.log('It\'s saved!');
                 });
};
