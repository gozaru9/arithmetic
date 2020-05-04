const express = require('express')
const dateUtils = require('date-utils')

const app = express()

const count = 10;

app.set("view engine", "ejs");
app.get('/', function(req, res) {

    let now = new Date();
    console.log(now.toFormat('YYYY年MM月DD日 HH24時MI分SS秒'));
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
    console.log(items);
    return items;
}

var createPlusItem = (max, min) => Math.floor( Math.random() * (max + 1 - min) ) + min;

app.listen(3000, () => console.log('Example app listening on port 3000!'))