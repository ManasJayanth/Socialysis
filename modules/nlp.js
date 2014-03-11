//Make a list of words: 're'
var pos = require('pos'),
    natural = require('natural'),
    nounFilter = require('./noun-filter');

function getCommonNouns (text) {

    var commonNouns = [],
        nounInflector = new natural.NounInflector(),
        tokenizer = new natural.WordTokenizer(),
        words = nounFilter.returnOnlyNouns(tokenizer.tokenize(text)),
        taggedWords = new pos.Tagger().tag(words);
    
    for (var i in taggedWords) {
        var taggedWord = taggedWords[i],
            word = taggedWord[0],
            tag = taggedWord[1];

        if(tag === 'NN' || tag === 'NNS') {
            if(tag === 'NNS') {
                commonNouns.push(nounInflector.singularize(word));
            } else {
                commonNouns.push(word);
            }
        }
    }

    return commonNouns;
}

function getNounCount (arr) {
    function diversify() {
        var nouns = wc.map(function (d) {
            return d.word;
        });
        nouns = nounFilter.returnOnlyNouns(nouns);
        wc = wc.map(function(d) {
            if (nouns.indexOf(d.word) !== -1) {
                console.log("--" + d.word);
                return d;
            } else {
                return {
                    word: '',
                    count: 0
                };
            }
        });
    }
    var wc = [];
    var text = arr.join(' ');
    text = text.replace(/[^a-zA-Z ]/g, '');
    
    while(text) {
        var words = text.split(' '),
            word = '';


        for (var i in words) {
            if (words[i] !== '' && words[i] !== ' ') {
                word = words[i];
                break;
            }
        }
        if(word === '') {
            break; // No more nouns left
        }
        var count = 0;
        var reg;
        try {
            reg = new RegExp(word, 'g');
        } catch (err) {
            // Ignore the thrown exception
        }
        var myArray;
        var match, matchcount = 0;
        while ((match = reg.exec(text)) !== null)
        {
            var msg = " -- " + match + " -- ";
            matchcount++;
        }
        wc.push({
            word: word,
            count: matchcount
        });
        text = text.replace(reg, '');
        text = text.replace(' ', '');
    }
    diversify();
    return wc;
}

exports.getNounCount = getNounCount;
exports.getCommonNouns = getCommonNouns;
