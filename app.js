// HPWA ASSIGNMENT 

// NODE JS MONGODB datbase used 
// Mahendra Gurve Sir 
// Submitted by :- Prakhar Saxena 16103003

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    session = require("express-session"),
    methodOverride = require("method-override");
mongoose.connect("mongodb://localhost/prakhar");
    

var eSchema = new mongoose.Schema({
        //index : Number,
        name : String,
        email: String,
        address: String,
        telephone: String,
        pin: Number
    
    });
    var Customer = mongoose.model("Customer",eSchema);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
// app.use(cookieParser('secret'));

app.use(require("express-session")({
    secret: "Smartness Overloaded",
    resave: false,
    saveUninitialized: false
}));

app.get("/action",function(req,res){
    res.render("action.ejs");
})

app.post('/enter', function(req, res){
	var email = req.body.email;
	var name = req.body.name;
    var address = req.body.address;
    var tel = req.body.telephone;
    var pin = req.body.pin;
	var data = {name : name , email : email , address : address , telephone : tel , pin : pin};
	Customer.create(data,function(err,newadded){
        if(err)
        {
            console.log(err);
        }
        else{
            console.log(data);
            console.log("successfully entered");
          
            res.redirect("/action");
        }
    })
});

app.get("/", function(req,res)
{

    res.render("home.ejs");

});

var port = 2805 //process.env.PORT || 5000;
app.listen(port,function(){
    console.log("sever is started");
 });

