class SettingsOrEvery {
    constructor() {
        this.tab = "Layers"

        this.layerTab = "!"

        this.shown = false
    }
}

class Layer1 {
    constructor(id) {
        this.id = id

        this.template = `
         <h1 class="center">You Have <span id="excvalue">0</span> !.</h1>
         <div class="tabs1">
         <button onclick="GetExcGain()">+<span id="clickValue">0</span></button>
         </div>
         <div class="flextable">
         <table>
         <tr>
         <th>Name</th>
         <th>Amount</th>
         <th>Bought</th>
         <th>Buy 1</th>
         </tr>
         <tr>
         <td>
         !<sub>G<sub>1</sub></sub> x<span id="mulgen1">0.5</span>
         </td>
         <td class="amount">
         0
         </td>
         <td class="bought">
         0
         </td>
         <td>
         <button onclick="buyGenerator(0)">Cost:<span id="costexc"></span></button>
         </td>
         </tr>
         <tr>
         <td>
         !<sub>G<sub>2</sub></sub> x<span id="mulgen2">0.5</span>
         </td>
         <td class="amount">
         0
         </td>
         <td class="bought">
         0
         </td>
         <td>
         <button onclick="buyGenerator(1)">Cost:<span id="costexc1"></span></button>
         </td>
         </tr>
         <tr>
         <td>
         !<sub>G<sub>3</sub></sub> x<span id="mulgen3">0.5</span>
         </td>
         <td class="amount">
         0
         </td>
         <td class="bought">
         0
         </td>
         <td>
         <button onclick="buyGenerator(2)">Cost:<span id="costexc2"></span></button>
         </td>
         </tr>
         <tr>
         <td>
         !<sub>G<sub>4</sub></sub> x<span id="mulgen4">0.5</span>
         </td>
         <td class="amount">
         0
         </td>
         <td class="bought">
         0
         </td>
         <td>
         <button onclick="buyGenerator(3)">Cost:<span id="costexc3"></span></button>
         </td>
         </tr>
         <tr>
         <td>
         !<sub>G<sub>5</sub></sub> x<span id="mulgen5">0.5</span>
         </td>
         <td class="amount">
         0
         </td>
         <td class="bought">
         0
         </td>
         <td>
         <button onclick="buyGenerator(4)">Cost:<span id="costexc4"></span></button>
         </td>
         </tr>
         </table>
         </div>
         <h1 class="center">You Have timer spent at <span id="timerexc"></span> seconds.</h1>
        `

        document.getElementById(id).innerHTML = this.template
    }
}

class LayerGenerator {
    constructor(cost, bought, mulitiplerStart, mulitiplerBoughted) {
        this.cost = cost

        this.bought = bought

        this.resource = new Decimal(0)

        this.mulitipler = new Decimal(0.5)

        this.mulitiplerStart = mulitiplerStart
        this.mulitiplerBoughted = mulitiplerBoughted
    }
}

class Game {
    constructor() {
        this.layers = [{
            resource:new Decimal(0),
            total:new Decimal(0),
            clickResource:0,
            timeSpent:0,
            buyGenerator(id) {
                if (game.layers[0].resource.gte(game.layers[0].generators[(id)].cost)) {
                game.layers[0].generators[(id)].bought =  game.layers[0].generators[(id)].bought.add(1)
                game.layers[0].generators[(id)].resource = game.layers[0].generators[(id)].resource.add(1)
                game.layers[0].resource = game.layers[0].resource.sub(game.layers[0].generators[(id)].cost)
               }
            },
            generators:[
                new LayerGenerator(new Decimal(10), new Decimal(0), new Decimal(0.5), new Decimal(2)),
                new LayerGenerator(new Decimal(1e3), new Decimal(0), new Decimal(0.5), new Decimal(2)),
                new LayerGenerator(new Decimal(1e5), new Decimal(0), new Decimal(0.5), new Decimal(2)),
                new LayerGenerator(new Decimal(1e8), new Decimal(0), new Decimal(0.5), new Decimal(2)),
                new LayerGenerator(new Decimal(1e11), new Decimal(0), new Decimal(0.5), new Decimal(2)),
            ]
        }]
        this.layersTab = [new Layer1("layer1")]

        this.settings = new SettingsOrEvery();
    }
}

var game = new Game()

function GetExcGain() {
    game.layers[0].resource = game.layers[0].resource.add(game.layers[0].generators[0].resource.div(25).add(1).mul(game.layers[0].generators[0].mulitipler.mul(2)))
}

const buyGenerator = (id) => {
    game.layers[0].buyGenerator(id)
}

setInterval(() => {
    if (game.settings.layerTab == "!") {
        document.getElementById("layer1").style.display = "block"
    } else {
        document.getElementById("layer1").style.display = "none"
    }
    game.layers[0].generators[0].cost = new Decimal.pow(5, game.layers[0].generators[0].bought).mul(10)
    game.layers[0].generators[0].mulitipler = new Decimal.pow(game.layers[0].generators[0].mulitiplerBoughted, game.layers[0].generators[0].bought).mul(game.layers[0].generators[0].mulitiplerStart)
    game.layers[0].generators[1].cost = new Decimal.pow(5, game.layers[0].generators[1].bought).mul(1e3)
    game.layers[0].generators[1].mulitipler = new Decimal.pow(game.layers[0].generators[1].mulitiplerBoughted, game.layers[0].generators[1].bought).mul(game.layers[0].generators[1].mulitiplerStart)
    game.layers[0].generators[2].cost = new Decimal.pow(5, game.layers[0].generators[2].bought).mul(1e5)
    game.layers[0].generators[2].mulitipler = new Decimal.pow(game.layers[0].generators[2].mulitiplerBoughted, game.layers[0].generators[2].bought).mul(game.layers[0].generators[2].mulitiplerStart)
    game.layers[0].generators[3].cost = new Decimal.pow(5, game.layers[0].generators[3].bought).mul(1e8)
    game.layers[0].generators[3].mulitipler = new Decimal.pow(game.layers[0].generators[3].mulitiplerBoughted, game.layers[0].generators[3].bought).mul(game.layers[0].generators[3].mulitiplerStart)
    game.layers[0].generators[4].cost = new Decimal.pow(5, game.layers[0].generators[4].bought).mul(1e11)
    game.layers[0].generators[4].mulitipler = new Decimal.pow(game.layers[0].generators[4].mulitiplerBoughted, game.layers[0].generators[4].bought).mul(game.layers[0].generators[4].mulitiplerStart)
    document.getElementById("excvalue").innerText = game.layers[0].resource
    document.getElementById("clickValue").innerText = game.layers[0].generators[0].resource.div(25).add(1).mul(game.layers[0].generators[0].mulitipler.mul(2))
    document.getElementById("costexc").innerText = game.layers[0].generators[0].cost
    document.getElementById("timerexc").innerText = game.layers[0].timeSpent
    document.getElementById("mulgen1").innerText = game.layers[0].generators[0].mulitipler
    document.getElementById("mulgen2").innerText = game.layers[0].generators[1].mulitipler
    document.getElementById("mulgen3").innerText = game.layers[0].generators[2].mulitipler
    document.getElementById("mulgen4").innerText = game.layers[0].generators[3].mulitipler
    document.getElementById("mulgen5").innerText = game.layers[0].generators[4].mulitipler
    document.getElementsByClassName("amount")[0].innerText =game.layers[0].generators[0].resource
    document.getElementsByClassName("bought")[0].innerText =game.layers[0].generators[0].bought
    document.getElementById("costexc1").innerText = game.layers[0].generators[1].cost
    document.getElementsByClassName("amount")[1].innerText =game.layers[0].generators[1].resource
    document.getElementsByClassName("bought")[1].innerText =game.layers[0].generators[1].bought
    document.getElementById("costexc2").innerText = game.layers[0].generators[2].cost
    document.getElementsByClassName("amount")[2].innerText =game.layers[0].generators[2].resource
    document.getElementsByClassName("bought")[2].innerText =game.layers[0].generators[2].bought
    document.getElementById("costexc3").innerText = game.layers[0].generators[3].cost
    document.getElementsByClassName("amount")[3].innerText =game.layers[0].generators[3].resource
    document.getElementsByClassName("bought")[3].innerText =game.layers[0].generators[3].bought
    document.getElementById("costexc4").innerText = game.layers[0].generators[4].cost
    document.getElementsByClassName("amount")[4].innerText =game.layers[0].generators[4].resource
    document.getElementsByClassName("bought")[4].innerText =game.layers[0].generators[4].bought
}, 100);
setInterval(() => {
    game.layers[0].resource = game.layers[0].resource.add(game.layers[0].generators[0].resource.mul(game.layers[0].generators[0].mulitipler.mul(2)))
    game.layers[0].generators[0].resource = game.layers[0].generators[0].resource.add(game.layers[0].generators[1].resource.mul(game.layers[0].generators[1].mulitipler))
    game.layers[0].generators[1].resource = game.layers[0].generators[1].resource.add(game.layers[0].generators[2].resource.mul(game.layers[0].generators[2].mulitipler))
    game.layers[0].generators[2].resource = game.layers[0].generators[2].resource.add(game.layers[0].generators[3].resource.mul(game.layers[0].generators[3].mulitipler))
    game.layers[0].generators[3].resource = game.layers[0].generators[3].resource.add(game.layers[0].generators[4].resource.mul(game.layers[0].generators[4].mulitipler))
    if (game.layers[0].generators[1].resource.gte(1) && game.layers[0].generators[1].bought.gt(0)) {
        document.getElementById("achievement1").className = "achievementUnlocked"
    } else {
        document.getElementById("achievement1").className = "achievementLocked"
    }
    if (game.layers[0].generators[2].resource.gte(1) && game.layers[0].generators[2].bought.gt(0)) {
        document.getElementById("achievement2").className = "achievementUnlocked"
    } else {
        document.getElementById("achievement2").className = "achievementLocked"
    }
    if (game.layers[0].generators[3].resource.gte(1) && game.layers[0].generators[3].bought.gt(0)) {
        document.getElementById("achievement3").className = "achievementUnlocked"
    } else {
        document.getElementById("achievement3").className = "achievementLocked"
    }
    if (game.layers[0].generators[4].resource.gte(1) && game.layers[0].generators[4].bought.gt(0)) {
        document.getElementById("achievement4").className = "achievementUnlocked"
    } else {
        document.getElementById("achievement4").className = "achievementLocked"
    }
}, 2048); // 2048 milliseconds
setInterval(() => {
    game.layers[0].timeSpent += 1
}, 1000);