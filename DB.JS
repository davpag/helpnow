const mysql=require("mysql");
var con = mysql.createConnection(
{
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "hackathon"
});

con.connect(function(err)
{
    con.query()
});