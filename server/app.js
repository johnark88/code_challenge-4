var express = require('express');
var app = express();
var path=require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var pg = require ('pg');

var conectionString = 'postgress://localhost:5432/sweetTreats';

var portDescision = process.env.PORT || 3031;


app.listen( portDescision, function(){
  console.log( 'server up on ' + portDescision );
});


app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'server/public/views/index.html' ) );
});

//get treats from DB
app.get('/treats', function(req,res){
console.log('in /treats get route ');
pg.connect(conectionString, function(err,client,done){
if (err) {
  console.log(err);
}else {
  var results = [];
  var queryResults = client.query('SELECT * from treat');
  queryResults.on('row',function(row){
    results.push(row);
  });//end queryResults on row
  queryResults.on('end', function(){
    done();
    res.send(results);
  });//end queryResults on end
}//end else no err
});//end  pg connect
});// end app.get treats


app.post('/treats',urlencodedParser, function(req,res){
  console.log('in app.post treats route ', req.body);
  
});









app.use( express.static( 'server/public' ) );
