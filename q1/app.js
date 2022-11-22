const express = require("express");
const app = express();
const cookieParser =  require("cookie-parser");
const bodyParser = require("body-parser");
const path=  require("path");

app.set("views", path.join(__dirname,"view"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());


app.get("/",(req,res)=>{
    let cookieArr=[];
    for (const property in req.cookies) {
        const cookieObj= {key:property , val:req.cookies[property]}
        cookieArr.push(cookieObj);
    }
    
    res.render("cookie" ,{cookieArr} );
    
})

app.post("/addCookie",(req,res)=>{
    let key= req.body.key;
    let val= req.body.value;
    res.cookie("ABC",{key,val});
    res.redirect(303,"/");
} )

app.listen(4125,()=>{
    console.log("Server is running on 4125...");
})