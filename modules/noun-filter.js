var fs = require('fs');

function returnOnlyNouns (wordlist) {
    var nouns = [];

    var contents = fs.readFileSync('modules/words.txt').toString().split(/\s/);
    for (var i in wordlist) {
        if(contents.indexOf(wordlist[i]) !== -1 && wordlist[i].length > 1) {
            nouns.push(wordlist[i]);
        }
    }
    return nouns;
}


exports.returnOnlyNouns = returnOnlyNouns;
// var wordlist = ['s', 'fight', 'animal'];  
// console.log(returnOnlyNouns(['m']));
