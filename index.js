const express = require('express')
const dateUtils = require('date-utils')

const app = express()

const count = 10;

app.set("view engine", "ejs");
app.get('/', function(req, res) {

    let now = new Date();
    const items = getTodayItems(count);
    res.render('index.ejs', {
        title: "足し算", 
        date: now.toFormat('YYYY年MM月DD日 HH24時MI分SS秒'),
        items: items
    });

});

function getTodayItems(count) {

    let items = [];
    for (let index = 0; index < count; index++)
    {
        let leftSide = createPlusItem(10, 1);
        let rightSide = createPlusItem(leftSide, 1);
        items.push({ 'index': index,'leftSide': leftSide, 'rightSide': rightSide, 'answer': leftSide + rightSide })
    }
    return items;
}

var createPlusItem = (max, min) => Math.floor( Math.random() * (max + 1 - min) ) + min;
app.set('port', process.env.PORT || 5050);
app.listen(app.get('port'), ()=>{ console.log("Node app is running at localhost:" + app.get('port')); });
