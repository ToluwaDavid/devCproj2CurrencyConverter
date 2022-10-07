const express = require("express");
const fs = require("fs");
const currency = require("./currency.json");
const app = express();
PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello form the Homepage");
});



//GET
//This endpoint converts the currency from one value pair to another
//The url contins 2 key and value pair, the first is the CurrencyPair and the second one is money
//Key for currencyPair is  for example "NGNGBP"
//Key for money is for example 100
app.get("/convert", (req, res) => {
  currencyPair = req.query.currencyPair;
  money = req.query.money;

  if (currencyPair == null) {
    res.send("Oga put parameter jare!");
  } else {
    const current = require("./currency.json");
    const found = current.find(
      (current) => current.currencyPair === currencyPair
    );
    fe = found.exchangeRate;
    estiamtedAmount = money * fe;
    console.log(estiamtedAmount);
    // return estiamtedAmount
  }

  res.send({estiamtedAmount})
});

// app.post("/NGNUSD/:money", (req, res) => {
//   const { money } = req.params;
//   console.log(money);
//   const found = current.find((current) => current.currencyPair === "NGNUSD");
//   console.log(found);
//   console.log(found.exchangeRate);
//   fe = found.exchangeRate;
//   const estiamtedAmount = money * fe;
//   console.log(estiamtedAmount);
// });



//GET
//Provide all the needed information about a currency pair 
app.get("/aboutcurrencypair/:currencyPair", (req, res) => {
  var par = req.params.currencyPair;
  console.log(par);
  const current = require("./currency.json");
  const found = current.find((current) => current.currencyPair === par);
  console.log(found);
  res.send(found)
});


//POST
//This functions add Currency pair details to the currency.json file
//The currency.json file contains all the details needed for conversion and also all the currency pair details
//A POST request to /addcurrency with the json file from the body or postman add the JSON object to currency.json
app.post("/addcurrencypair", (req, res) => {
  pair = req.body;
  fs.readFile("currency.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);
      obj.push(pair);
      var son = JSON.stringify(obj);
      fs.writeFile("currency.json", son, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
