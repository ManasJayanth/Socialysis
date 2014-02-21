var pos = require('pos');
var natural = require('natural'), 
    log = console.log;

nounInflector = new natural.NounInflector();

function getNounCount (text) {

    var commonNouns = [];
    var words = new pos.Lexer().lex(text);
    var taggedWords = new pos.Tagger().tag(words);
    for (i in taggedWords) {
        var taggedWord = taggedWords[i];
        var word = taggedWord[0];
        var tag = taggedWord[1];

        if(tag == 'NN' || tag == 'NNS') {
            if(tag == 'NNS') {
                commonNouns.push(nounInflector.singularize(word));
            } else {
                commonNouns.push(word);
            }
        }
    }

    return commonNouns;
}

function wordCount (arr) {
    var wc = [];
    var text = arr.join(' ');
    text += ' feature feature feature';
    log('Text: ' + text);
    
    while(text) {
        var words = text.split(' ');
        for (var i in words) {
            if (words[i] !== '') {
                word = words[i];
                break;
            }
        }
        var count = 0;
        var reg = new RegExp(word, 'g');
        var myArray;
        var match, matchcount = 0;
        while ((match = reg.exec(text)) !== null)
        {
            var msg = "Found " + match + ".  ";
            matchcount++;
            console.log(msg);
        }
        wc.push({
            word: word,
            count: matchcount
        });
        text = text.replace(reg, '');
        text = text.replace(' ', '');
    }

    log(wc);
}

wordCount(getNounCount('Like many of the other features, String can be patched to perform the operations directly. The "Noun" suffix on the methods is necessary, as verbs will be supported in the'));
