const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const _=require("lodash");
require("dotenv").config();
const date=require(__dirname+"/date.js");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL);

const itemsSchema={
    name:String
};
const Item=mongoose.model("Item",itemsSchema);

const item1=new Item({
    name:"Hit plus button to add items"
});

const item2=new Item({
    name:"Hit checkbox to delete the item"
})
const item3=new Item({
    name:"You can use our website to keep your to do list datas"
})
const defaultItems=[item1,item2,item3];

const listSchema=new mongoose.Schema({
    name:String,
    items:[itemsSchema]
});
const List=mongoose.model("List",listSchema);

app.get("/",function(req,res){
    //day=date.getDay();
    day=date.getDate();
   
    async function readItems(){
        const items=await Item.find({}); //find=array
        if(items.length===0){
            Item.insertMany(defaultItems).then(function(){
            console.log("Successfully added items to mongoose database");});
            res.redirect("/");
        }else{
            res.render("list",{listTitle:"Today",newlistItems:items});
        }       
    };
    readItems();
    
})
app.post("/",async(req,res)=>{
    const brandnewItem=req.body.newItem;
    const listName=req.body.list;

    const item=new Item({
        name:brandnewItem
    });

    if(listName==="Today"){
        item.save();
        res.redirect("/");
    }else{
        //belongs with /:customListName 
        List.findOne({name:listName},function(err,foundList){ //findOne=string
            foundList.items.push(item);
            foundList.save();
            res.redirect("/"+listName);
        });
}
})
app.post("/delete",function(req,res){
    const checkedItem=req.body.checkbox;
    const listName=req.body.listName

    if(listName==="Today"){
        Item.findByIdAndRemove(checkedItem,function(err){
            if(!err){
                console.log("Succefully deleted the item");
                res.redirect("/");
            }
        });
    }else{
        List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItem}}},function(err,foundList){
            if(!err){
                res.redirect("/"+listName);
            }
        });
    }
    })
app.get("/:customListName",function(req,res){
    const customListName =_.capitalize(req.params.customListName); //console->string /NAME get
    List.findOne({name:customListName},function(err,foundList){ //findOne=string
        if(!err){
            if(!foundList){
            //Create a new list
            const list=new List({
                name:customListName,
                items:defaultItems
            });
            list.save();
            res.redirect("/"+customListName);
        }else{
            //Show an existing list
            res.render("list",{listTitle:foundList.name,newlistItems:foundList.items});
        }
    }
    });
    })
app.listen(3000,function(req,res){
    console.log("Server is running on Port 3000");
})