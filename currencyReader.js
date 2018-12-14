/**
 * Created by Simon on 12/3/2018.
 */
const API = "https://api.exchangeratesapi.io/latest";

function getCurrencyInfo (containerName) {
    const container = $('#' + containerName);

    $.get(API, function (data) {
        const base = data.base;
        const date = data.date;
        const cad = data.rates.CAD;
        const gbp = data.rates.GBP;
        const usd = data.rates.USD;
        const jpy = data.rates.JPY;
        const chf = data.rates.CHF; //swiss frank//
        const cny = data.rates.CNY; //chinese yen
        var currencyArray = {cad:cad, gbp:gbp, usd:usd, jpy:jpy, chf:chf, cny:cny};
        addHtmlCurrencies(base, date, currencyArray);
    }).fail(function () {
        console.log("CurrencyInfo error");
    });

    function addHtmlCurrencies(base, date, currencyArray) {
        container.append(`<li class="col-xs-6 col-lg-2">
        <span class="title"><i class="fa fa-dollar"></i> Canadian Dollar</span>
    <h3>${currencyArray['cad']}</h3> 
    <li class="col-xs-6 col-lg-2">
        <span class="title"><i class="fa fa-gbp"></i> British Pound</span>
    <h3>${currencyArray['gbp']}</h3> 
    <li class="col-xs-6 col-lg-2">
        <span class="title"><i class="fa fa-dollar"></i> U.S Dollar</span>
    <h3>${currencyArray['usd']}</h3> 
    <li class="col-xs-6 col-lg-2">
        <span class="title"><i class="fa fa-jpy"></i> Japanise Yen</span>
    <h3>${currencyArray['jpy']}</h3> 
    <li class="col-xs-6 col-lg-2">
        <span class="title"><i class="fa fa-money"></i> Swiss Franc</span>
    <h3>${currencyArray['chf']}</h3> 
    <li class="col-xs-6 col-lg-2">
        <span class="title"><i class="fa fa-cny"></i> Chinese Yen</span>
    <h3>${currencyArray['cny']}</h3> 
`);}

}
function calculateRate() {
    form = document.getElementById("conversion");

    var v1 = document.forms["conversion"]["from"].value;
    var v2 = document.forms["conversion"]["amount"].value;
    var v3 = document.forms["conversion"]["to"].value;
    if (v1 == "" || v2 == "" || v3 == "") {
       alert("Please fill out all the fields!");
        return false;
    } else {

        var from = form.elements.from.value.toUpperCase();
        var ammount = form.elements.amount.value;
        var to = form.elements.to.value.toUpperCase();
            url = "https://api.exchangeratesapi.io/latest?base=" + from;
    $.get(url, function (data) {

        var rate = data.rates[to];
        var converted = ammount * rate;
        converted = converted.toFixed(4);
        displayConvertion(converted, from, to, ammount);
    }).fail( function () {
        alert("Network Connection Failed");

    })
    }
};
var items = [];
function displayConvertion(converted, from, to, ammount) {

var container = $("#" + "convAmount");
   // container.empty();
    var x = document.getElementById("convAmount").childElementCount;
    container.append(`<table class="table table-hover">
        <tbody>
        <tr>
         <td><h4>${x}) ${ammount } ${from} will give you approximately ${converted} ${to}</h4></td>
        </tr>
        </tbody>
        </table>`);

    if (typeof(Storage) !== "undefined") {
        var item = ammount + " "+ from + " will give you approximately " + converted + " "+ to;
         items.push(item);
        var myStorage = window.localStorage;
        myStorage.setItem("items", JSON.stringify(items));
    }
    console.log(JSON.parse(localStorage.getItem("items")));

}



function getBitcoinInfo(containerName) {
    const coincontainer = $('#' + containerName);
    var url = "https://blockchain.info/ticker";
    $.get(url, function (data) {
    displayBitcoin(coincontainer, data.USD.buy, data.USD.sell, data.USD.symbol);
    }).fail(function (e) {
        console.log("error bitcoin'")
    });
}
function displayBitcoin(coincontainer, buy, sell, symbol) {
    coincontainer.append(`<li class="col-xs-6 col-md-6">
        <h3 class="title"><i class="fa fa-dollar"></i> Buy</h3>
    <h2>${buy}</h2> 
    <li class="col-xs-6 col-md-6">
        <h3 class="title"><i class="fa fa-dollar"></i> Sell</h3>
    <h2>${sell}</h2> 
`);
}