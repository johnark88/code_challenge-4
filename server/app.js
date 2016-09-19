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
  console.log('connected to the sweet treats DB!');
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

//input new treats to database
app.post('/treats',urlencodedParser, function(req,res){
  console.log('in app.post treats route ', req.body);
  pg.connect(conectionString, function(err,client,done){
    if (err) {
      console.log(err);
    }else {
      console.log('connected to the sweet treats DB!');
      client.query('INSERT INTO treat (name,description,pic) VALUES ($1, $2, $3)',[req.body.name,req.body.description,req.body.url]);
     res.send({success: true});
    }//end else statment
  });//end pg connect
});//end app.post new treats


//search database with user input q=?
//I can't seem to get my client connected to this route.....
app.get('/treats?q=',function(req , res){
console.log('in app.get query route',req.query.q);
pg.connect(conectionString, function(err,client,done){
if (err) {
  console.log(err);
}else {
  console.log('connected to the sweet treats DB!for query');
  var results = [];
  var queryResults = client.query('SELECT * FROM treat WHERE (1$)',[req.query.q]);
  queryResults.on('row',function(row){
    results.push(row);
  });//end queryResults on row
  queryResults.on('end', function(){
    done();
    res.send(results);
  });//end queryResults on end
}//end else no err
});//end  pg connect
});//end app.get query function


app.use( express.static( 'server/public' ) );
