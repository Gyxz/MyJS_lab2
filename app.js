/* comands in terminal
* node app - start server
* */

const express = require('express');
const pug = require('pug');
const path = require('path');
//connect the modules


const app = express();//express as function, after that we can start server


app.use(express.json());//json - javascript object notation, dynamic data type
app.use(express.urlencoded());//encode the data

app.set('view engine', 'pug');//app works with pug files
app.set('views', path.join(__dirname, 'static', 'views', 'pages'));//location of static files


class SpaceStation
{
    constructor(name,capacity,needs,goodsInStorage)
    {
      this.name = name;
      this.capacity = capacity;
      this.needs = needs;
      this.goodsInStorage = goodsInStorage;
    }
}

class Goods {
    constructor(code, name, mass) {
        this.name = name;
        this.code = code;
        this.mass = mass;
    }
  }

class Planet {
    constructor(name, capacity, mass,goodsInStorage) {
        this.name = name;
        this.capacity = capacity;
        this.mass = mass;
        this.goodsInStorage = goodsInStorage;
    }
  }

let accountant = (storage) => {
    let mas = [];
    storage.forEach(value => {
        let obj = {
            storage: value.name,
            goodsInStorage: value.goodsInStorage.length,
            goods: {},
            allGoods: value.capacity
        };

        value.goodsInStorage.forEach(goods => {
            obj.goods[goods.code] = obj.goods[goods.code] + 1 || 1;
        });

        mas.push(obj)
    });

    return mas
};

let spacestation = [new SpaceStation('LPS', 900,'сталь,алюміній', []), new SpaceStation('PPL', 50,'продукти', []),
    new SpaceStation('Silpo', 24,'будь-який товар', [])];


 let goods = [new Goods(123,'мясо', 30), new Goods( 987,'яблука',10),
    new Goods(654,'сталь', 10), new Goods( 666,'алюміній',10), new Goods( 1235,'хліб',5)];

let planet = [new Planet('Земля', 600,600000, []), new Planet('LP-321-k', 200,60000000, []),
    new Planet('OK-098-1', 600,80000000, [])];


app.get('/', (req, res) => {//render index (home page)
    res.render('index')
});

app.get('/spacestation', (req, res) => {//render /shop
    res.render('spacestation', {dataSpaceStation: spacestation})
});

app.post('/addSpaceStation', (req, res) => {//with this we can create data
    let info = req.body;

    spacestation.push(new SpaceStation(info.name, info.capacity,info.needs, []));
    res.render('spacestation', {dataSpaceStation: spacestation})
});

app.post('/editSpaceStation', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    spacestation[index] = new SpaceStation(info.name, info.capacity,info.needs, []);

    res.render('spacestation', {dataSpaceStation: spacestation})
});

app.post('/deleteSpaceStation', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    spacestation.splice(index, 1)

    res.render('spacestation', {dataSpaceStation: spacestation, info: 'SpaceStation видаленно!'})
});

app.post('/findSpaceStation', (req, res) => {
    let info = req.body;

    let meet = spacestation.filter(value => {
        return value.name === info.name
    });

    if (meet.length === 0) {
        res.render('spacestation', {dataSpaceStation: spacestation, find: 'SpaceStation не знайдено!'})
    } else {
        res.render('spacestation', {dataSpaceStation: spacestation, find: `SpaceStation ${JSON.stringify(meet[0])} знайдено!`})
    }
});

app.get('/goods', (req, res) => {
    res.render('goods', {goods: goods})
});

app.post('/addGoods', (req, res) => {
    let info = req.body;

    let check = goods.filter(value => {
        return value.code === +info.code
    });

    if (check.length === 0) {
        goods.push(new Goods(+info.code, info.name, info.mass))
        res.render('goods', {info: 'Товар успішно додано',goods: goods})
    } else {
        res.render('goods', {info: 'Перевірте код! Товар з таким кодом уже існує',goods: goods})
    }
});

app.post('/editGoods', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    goods[index] = new Goods(goods[index].code, info.name, info.mass);
    res.render('goods', {goods: goods})
});

app.post('/deleteGoods', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    goods.splice(index, 1);

    res.render('goods', {goods: goods, info: 'Товар видаленно!'})
});

app.post('/findGoods', (req, res) => {
    let info = req.body;

    let meet = goods.filter(value => {
        return value.code === +info.code
    });

    if (meet.length === 0) {
        res.render('goods', {goods: goods, find: 'Товар не знайдено!'})
    } else {
        res.render('goods', {goods: goods, find: `Товар ${JSON.stringify(meet[0])} знайдено!`})
    }
});

app.get('/planet', (req, res) => {
    res.render('planet', {dataplanet: planet})
});

app.post('/addPlanets', (req, res) => {
    let info = req.body;

    planet.push(new Planet(info.name, info.capacity,info.mass, []));
    res.render('planet', {dataplanet: planet})
});


app.post('/editPlanets', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    planet[index] = new Planet(info.name, info.capacity,info.mass, []);

    res.render('planet', {dataplanet: planet})
});

app.post('/deletePlanets', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    planet.splice(index, 1)

    res.render('planet', {dataplanet: planet, info: 'Планета видаленна!'})
});

app.post('/findPlanets', (req, res) => {
    let info = req.body;

    let meet = planet.filter(value => {
        return value.name === info.name
    });

    if (meet.length === 0) {
        res.render('planet', {dataplanet: planet, find: 'Планета не знайдена!'})
    } else {
        res.render('planet', {dataplanet: planet, find: `Планету ${JSON.stringify(meet[0])} знайдено!`})
    }
});

app.get('/GoodstoPlanet', (req, res) => {

    res.render('GoodstoPlanet', {goods: goods, dataplanet: planet, acc: accountant(planet)})
});

app.post('/addGoodstoPlanet', (req, res) => {
    let info = req.body;
    let indexGoods = info.indexGoods[0];
    let indexSt = info.index[0];

    if (planet[indexSt].goodsInStorage.length === planet[indexSt].capacity) {
        res.render('GoodstoPlanet', {
            goods: goods,
            dataplanet: planet,
            info: `Товар не додано перевірте місткість`,
            acc: accountant(planet)
        })
    } else {
        planet[indexSt].goodsInStorage.push(goods[indexGoods]);
        res.render('GoodstoPlanet', {
            goods: goods, dataplanet: planet, acc: accountant(planet),
            info: `Товар ${goods[indexGoods].name} додано на склад планети ${planet[indexSt].name}`
        })
    }

});

app.post('/deleteGoodstoPlanet', (req, res) => {
    let info = req.body;
    let indexGoods = info.indexGoods[0];
    let indexSt = info.index[0];
    let checker = 0;

    planet[indexSt].goodsInStorage.forEach((value, index, arr) => {
        if (value.code === goods[indexGoods].code && checker === 0) {
            arr.splice(index, 1);
            checker++;
        }
    });

    res.render('GoodstoPlanet', {goods: goods, dataplanet: planet, acc: accountant(planet)})
});


app.get('/GoodstoStation', (req, res) => {

    res.render('GoodstoStation', {goods: goods, dataSpaceStation: spacestation, acc: accountant(spacestation)})
});

app.post('/addGoodstoStation', (req, res) => {
    let info = req.body;
    let indexGoods = info.indexGoods[0];
    let indexSt = info.index[0];

    if (spacestation[indexSt].goodsInStorage.length === spacestation[indexSt].capacity) {
        res.render('GoodstoStation', {
            goods: goods,
            dataSpaceStation: spacestation,
            info: `Товар не додано перевірте місткість`,
            acc: accountant(spacestation)
        })
    } else {
        spacestation[indexSt].goodsInStorage.push(goods[indexGoods]);
        res.render('GoodstoStation', {
            goods: goods, dataSpaceStation: spacestation, acc: accountant(spacestation),
            info: `Товар ${goods[indexGoods].name} додано на склад станції ${spacestation[indexSt].name}`
        })
    }

});

app.post('/deleteGoodstoStation', (req, res) => {
    let info = req.body;
    let indexGoods = info.indexGoods[0];
    let indexSt = info.index[0];
    let checker = 0;

    spacestation[indexSt].goodsInStorage.forEach((value, index, arr) => {
        if (value.code === goods[indexGoods].code && checker === 0) {
            arr.splice(index, 1);
            checker++;
        }
    });

    res.render('GoodstoStation', {goods: goods, dataSpaceStation: spacestation, acc: accountant(spacestation)})
});

app.get('/reportstation', (req, res) => {
    res.render('reportstation', {acc: accountant(spacestation)})
});

let storageChecker = (storage) => {
    let inStorage = accountant(storage);
    let end = [];

    inStorage.forEach((value, index) => {
        let conclusion = (value.goodsInStorage / value.allGoods) * 100;
        if (conclusion < 30) end.push(storage[index])
    });

    return end
};

app.post('/reportstation', (req, res) => {
    console.log(storageChecker(spacestation));
    res.render('reportstation', {acc: accountant(spacestation), data: storageChecker(spacestation)})
});


app.get('/allSpaceStation', (req, res)=>{
    res.render('collection/allSpaceStation', {data: spacestation})
});

app.get('/allGoods', (req, res)=>{
    res.render('collection/allGoods', {data: goods})
});

app.get('/allPlanets', (req, res)=>{
    res.render('collection/allPlanets', {data: planet})
});


app.listen(3000, () => {//function of server
    console.log(3000)
});