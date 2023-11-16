const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const date=require(__dirname+"/date.js");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

Items=["Watching Movie","Listening to Music","Studying"];
workItems=["php","javascript","python","java"];
app.get("/",function(req,res){
    //day=date.getDay();
    day=date.getDate();
    res.render("list",{listTitle:day,newlistItems:Items});
})
app.post("/",function(req,res){
    var brandnewItem=req.body.newItem;

    if(req.body.list=="Work"){ //submit button's value
    var brandnewworkItem=req.body.newItem;
    workItems.push(brandnewworkItem);
    res.redirect("/work");
    }else{
        Items.push(brandnewItem);
    res.redirect("/");
    }    
})
app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work Items",newlistItems:workItems});
});
app.post("/work",function(req,res){
    var brandnewworkItem=req.body.newItem;
    workItems.push(brandnewworkItem);
    res.redirect("/work");
})
app.get("/aboutus",function(req,res){
    res.render("about");
})
app.listen(3000,function(req,res){
    console.log("Server is running on Port 3000");
})