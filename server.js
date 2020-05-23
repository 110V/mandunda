const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
let games = {};
app.use(bodyParser());
app.use(cors());
app.options('/:id', cors());
app.get('/:id', (req, res) => {
    const game = games[req.param('id')];
    if (game) {
        res.json(game);
    } else {
        res.sendStatus(404);
    }
});
app.post('/:id', (req, res) => {
    games[req.param('id')] = req.body;
    res.sendStatus(200);
});
app.listen(5353);

/*fetch("http://localhost:5353/:ㄱㅔ임 아이디", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({"game": {"hello":"hi"}})
});
해서 쓰고
{"game": (게임 json)}
fetch("http://localhost:5353/10%22).then(x => x.json()).then(x => {
  (x);
});*/