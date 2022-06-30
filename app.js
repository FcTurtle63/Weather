const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const sessionStorage = require("sessionStorage");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req1, res1) {
  const chkbox1 = req1.body.chkbox1;
  console.log(chkbox1);
  const query = req1.body.cityName;
  console.log(query);
  const apiKey = "104f7f169911c1d3da3936a5cabd9723";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    units +
    "&appid=" +
    apiKey;

  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      // const temp = Math.round(weatherData.main.temp);
      const temp = Math.round(weatherData.temp);
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      // beg the write as dialog
      if (chkbox1 === 'X') {
        console.log("chkbox1 selected");
        // here we serve the initial page (always signup)
        // app.get("/", function(req, res) {


        //using sessionStorage
        sessionStorage.setItem('descriptionresult', description);

        var fName = sessionStorage.getItem("descriptionresult");
        console.log("siamo in app.js " + fName);

        // res1.document.getElementById("cityInput").style.color="red";


        // app.post("/result.html", function (req2, res2) {

        // }

        // res1.sendFile(__dirname + "/result.html");
        res1.sendFile(__dirname + "/index.html");
        // });

      } else {
        res1.write("<p>The weather is currently " + description + ".<p>");
        res1.write(
          "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degrees Celcius</h1>"
        );
        res1.write("<img src=" + imageURL + ">");

        res1.write("<form name='ciccio'>" +
          "<textarea name='outta' rows='10' cols='60'>" +
          "The weather is currently " + description + "The temperature in " +
          query +
          " is " +
          temp +
          " degrees Celcius" +
          "</textarea>" +
          "</form>");

        // for (var i = 0; i < 3; i++) {
        //   res1.write("<h4>counter " + i + "</h4>");
        // }
        // res1.send();

      }
      // end the write as dialog
    });
  });
});





// app.listen(process.env.port || 3000, function() {
//   console.log("Server is running on port 3000.");
// });
app.listen(process.env.port || 3000, function() {
  console.log("Server is running on server with port : " + process.env.port);
  console.log("Server is running on local host on port : " + "3000");
});
