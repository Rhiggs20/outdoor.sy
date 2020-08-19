//Dockwa 
//Ryley Higgins
//Outdoor.sy

//Require statements 
var app = require("express")(); 
var bodyParser = require("body-parser"); 
var fs = require('fs');

//Set views
app.set("view engine", "ejs"); 
app.set("views", __dirname + "/views"); 

//Use body-parser
app.use(bodyParser.urlencoded({ extended: false })); 


//Initalize an array 
var customers = [];

//Read in file & check for error 
fs.readFile('pipes.txt', (err, data) => { 
  if (err) throw err;

  //Prep variables to create objects from input file
  var array = data.toString().split("\n");
  var j = 0;

  //Set object properties
  for (let i = 0; i < array.length; i++) {
    var arr = array.toString().split('|').join(',').split(',');
    var full_name = arr[j] + " " + arr[j+1];
    var customer = {
      name: full_name,
      email: arr[j+2],
      vehicle: arr[j+3],
      vehicle_name: arr[j+4],
      vehicle_length: arr[j+5]
    };

    //Iterate and push object to object array 
    j = j + 6;
    customers.push(customer);
  }
  console.log(customers);
}); 

//Send object array to ejs & host server on 8080
app.get("/", (req, res) => { res.render("index", { customers: customers }); });
app.listen(8080, () => { console.log("Server at http://localhost:8080"); });