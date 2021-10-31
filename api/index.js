const http = require('http');
const url = require('url');
const fetch = require('node-fetch');
const cards = require('./cards');

http.createServer(async (req, res) => {
    const reqURL = url.parse(req.url, true);
    const { uid } = reqURL.query;

    if (!uid) {
        res.write(JSON.stringify({error: 'Please input your ScoreSaber user ID. https://github-readme-score-saber.vercel.app/api?uid=YOUR_ID'}));
        res.end();
        return;
    }

    const ssURL = `https://new.scoresaber.com/api/player/${uid}/full`;
    const ssInfo = await fetch(ssURL);
    const json = await ssInfo.json();

    if (!json.playerInfo || json.error) {
        res.write(JSON.stringify({error: 'Your ScoreSaber ID is not correct.'}));
        res.end();
        return;
    }

    const gitapiURL = `https://api.github.com/repos/DetegiCE/Github-Readme-ScoreSaber/issues`;
    const pp500Info = await fetch(gitapiURL);
    const json500 = await pp500Info.json();

    if (!json500[0]) {
        res.write(JSON.stringify({error: 'Github API Error'}));
        res.end();
        return;
    }

    const result = await cards(json, parseInt(json500[0].body));
    res.setHeader('Content-Type', 'image/svg+xml');
    res.write(result);
    res.end();
}).listen(3000, function() {
    console.log("Listening on 3000");
})
