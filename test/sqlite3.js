var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('players.db');
 
//  db.serialize(function() {
  // Create a table
  db.run("CREATE TABLE IF NOT EXISTS Players (id INTEGER PRIMARY KEY AUTOINCREMENT, ip TEXT, name TEXT, score INTEGER)");
 
  // Insert data into the table
  db.run("INSERT INTO Players (ip,name,score) VALUES ('127.0.0.1','Kousthub','69')");

  // Query data from the table
  db.all("SELECT * FROM players", function(err, rows) {
    rows.forEach(function (row) {
      console.log(row.id + "- IP:" + row.ip + "  Name:" + row.name + "  Score: " + row.score);
    });
   });
//  });

 db.close();