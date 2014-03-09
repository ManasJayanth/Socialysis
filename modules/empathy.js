var fs = require('fs'),
    natural = require('natural');

function suggestSong(status) {
    var angerWords = fs.readFileSync('./empathy-files/anger').toString().split(', '),
        apatheticWords = fs.readFileSync('./empathy-files/apathetic').toString().split(', '),
        embarrassedWords = fs.readFileSync('./empathy-files/embarrassed').toString().split(', '),
        exciteWords = fs.readFileSync('./empathy-files/excite').toString().split(', '),
        fearWords = fs.readFileSync('./empathy-files/fear').toString().split(', '),
        happyWords = fs.readFileSync('./empathy-files/happy').toString().split(', '),
        loveWords = fs.readFileSync('./empathy-files/love').toString().split(', '),
        questionWords = fs.readFileSync('./empathy-files/question').toString().split(', '),
        sadWords = fs.readFileSync('./empathy-files/sad').toString().split(', ');

    var count = {};
    count.anger = 0;
    count.apathetic = 0;
    count.embarrassed = 0;
    count.excited = 0;
    count.fear = 0;
    count.happy = 0;
    count.love = 0;
    count.question = 0;
    count.sad = 0;

    natural.LancasterStemmer.attach();
    var statusWords = [];
    var tokenizer = new natural.WordTokenizer();
    tokenizer.tokenize(status).forEach(function(word) {
        statusWords.push(word.stem());
    });

    for(var i in statusWords) {
        if(angerWords.indexOf(statusWords[i]) !== -1) {
            count.anger++;
        } else if (apatheticWords.indexOf(statusWords[i]) !== -1) {
            count.apathetic++;
        } else if (embarrassedWords.indexOf(statusWords[i]) !== -1) {
            count.embarrassed++;
        } else if (exciteWords.indexOf(statusWords[i]) !== -1) {
            count.excited++;
        } else if (fearWords.indexOf(statusWords[i]) !== -1) {
            count.fear++;
        } else if (happyWords.indexOf(statusWords[i]) !== -1) {
            count.happy++;
        } else if (loveWords.indexOf(statusWords[i]) !== -1) {
            count.love++;
        } else if (questionWords.indexOf(statusWords[i]) !== -1) {
            count.question++;
        } else if (sadWords.indexOf(statusWords[i]) !== -1) {
            count.sad++;
        } else {
            // Nothing
        }   
    }

    var userEmotion = 'alright', emotionMeter = 0;
    for(emotion in count) {
        if(emotionMeter < count[emotion]) {
            emotionMeter = count[emotion];
            userEmotion = emotion;
        }
    }
    
    songLinks = fs.readFileSync('./empathy-files/mix/' + userEmotion).toString().split(', ');
    return songLinks[ Math.floor(Math.random() * songLinks.length) ];
}

// song = suggestSong('I feel bad');
// console.log('You should listen to: ' + song);

exports.suggestSong = suggestSong;
