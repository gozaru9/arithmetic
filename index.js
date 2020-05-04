const express = require('express')
const dateUtils = require('date-utils')

const app = express()

const count = process.env.COUNT || 10;
const max = process.env.MAX_LEFT_VALUE || 20;

app.set("view engine", "ejs");
app.get('/', function(req, res) {

    let now = new Date();
    const items = getTodayItems(count);
    res.render('index.ejs', {
        title: "足し算", 
        date: now.toFormat('YYYY年MM月DD日'),
        items: items,
        total: count
    });

});

function getTodayItems(count) {

    let items = [];
    for (let index = 0; index < count; index++)
    {
        let leftSide = createPlusItem(max, 1);
        let rightSide = createPlusItem(leftSide, 1);
        items.push({ 'index': index,'leftSide': leftSide, 'rightSide': rightSide, 'answer': leftSide + rightSide })
    }
    return items;
}

var createPlusItem = (max, min) => Math.floor( Math.random() * ( parseInt(max) + 1 - parseInt(min) ) ) + parseInt(min);

app.set('port', process.env.PORT || 5050);
app.listen(app.get('port'), ()=>{ console.log("Node app is running at localhost:" + app.get('port')); });
