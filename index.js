import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const port = 3000;
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

var riddle = "";
var riddle_answer = "";


app.get("/", async (req, res)=> {
    try {
        let result = await axios.get("https://riddles-api.vercel.app/random");
        riddle = result.data.riddle;
        riddle_answer = result.data.answer;
        res.render("index.ejs", {
            riddle : riddle,
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/next_riddle", async (req, res) => {
    try {
        const response = await axios.get("https://riddles-api.vercel.app/random");
        riddle_answer = response.data.answer;
        res.json(response.data);
    } catch (error) {
        console.log(error);
    }
});

app.get("/riddle-answer", (req, res) => {
    res.send(riddle_answer);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
})