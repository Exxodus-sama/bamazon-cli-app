// Dependencies
// =============================================================
var mysql = require('mysql');
var prompt = require('prompt');
var Table = require('cli-table');

// Connection to the database
// =============================================================
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
	user: 'root',
	password: 'password',
	database: 'Bamazon_db', 
});

// Setting up the connection
// =============================================================
connection.connect();

//Connects to the mysql database and displays the items in a table using the 'cli-table' npm package!
// =============================================================
connection.query('SELECT ItemID, Product, Price, Stock FROM Products', function(err, result){
	if(err) throw(err);

	var table = new Table({
		head: ['Item Id', 'Product', 'Price', 'Stock'],
		style: {
			head: ['red'],
			compact: false,
			colAligns: ['center'],
		}
	});

	for(var i = 0; i < result.length; i++){
		table.push(
			[result[i].ItemID, result[i].Product, result[i].Price, result[i].Stock]
		);
	}
	console.log(table.toString());
});

prompt.start();

// Ask for Item ID
console.log('Which item would you like to buy?' + "\n");
prompt.get(['buyItemID'], function (err, result) {
  
  // Show Item ID selected
  var buyItemID = result.buyItemID;
  console.log('You have selected Item # ' + buyItemID + '.');

  // Then ask for Quantity (once user completed first entry)
  console.log('\nOK, how many do you wish to buy?')
  prompt.get(['buyItemQuantity'], function (err, result) {

    // Show quantity selected
    var buyItemQuantity = result.buyItemQuantity;
    console.log('You have selected to buy ' + buyItemQuantity + ' of these.');

    // Once the customer has placed the order, check if store has enough of the product to meet the request
    connection.query('SELECT Stock FROM products WHERE ?', [{ItemID: buyItemID}], function(err, res){
      if(err) throw err; 
      if(res[0] == undefined){
        console.log('We are very sorry... We found no items with Item ID "' +  buyItemID + '"');
        connection.end();
      } else{
        var bamazonQuantity = res[0].Stock;

        // If sufficient inventory
        if(bamazonQuantity >= buyItemQuantity){

          // Updates the database with reduced inventory
          var newInventory = parseInt(bamazonQuantity) - parseInt(buyItemQuantity);

          connection.query('UPDATE products SET ? WHERE ?', [{Stock: newInventory}, {ItemID: buyItemID}], function(err, res){
            if(err) throw err;
          });


          // Show customer their purchase total (need to query the price info from database)
          var customerTotal;
          connection.query('SELECT Price FROM products WHERE ?', [{ItemID: buyItemID}], function(err, res){
            
            var buyItemPrice = res[0].Price;
            customerTotal = buyItemQuantity*buyItemPrice.toFixed(2);

            console.log('\nYour total is $' + customerTotal + '.');
            console.log('\nThank You come again!');
            connection.end();
          }); 
        }
        // Insufficient inventory
        else{
          console.log('We are very sorry... We only have ' +  bamazonQuantity + ' of those items. Order cancelled.');
          connection.end();
        }
      }
    });
  });
});