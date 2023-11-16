const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
    //res.send("Hello world");

    // var today1=new Date(); //Monday=1,Sat=6,Sun=0
    // if(today1.getDay()=== 0 || today1.getDay()===6){
    //     res.send("<h1>Weekend</h1>");
    // }else{
    //     res.send("<h1>Working Day</h1>");
    // }

    // var today2=new Date();
    // var currentDay=today2.getDay();
    // switch (currentDay) {
    //     case 0:
    //         res.sendFile(__dirname+"/days/sunday.html");
    //         break;
    //         case 1:
    //         res.sendFile(__dirname+"/days/monday.html");
    //         break;
    //         case 2:
    //         res.sendFile(__dirname+"/days/tuesday.html");
    //         break;
    //         case 3:
    //         res.sendFile(__dirname+"/days/wednesday.html");
    //         break;
    //         case 4:
    //         res.sendFile(__dirname+"/days/thursday.html");
    //         break;
    //         case 5:
    //         res.sendFile(__dirname+"/days/friday.html");
    //         break;
    //         case 6:
    //         res.sendFile(__dirname+"/days/saturday.html");
    //         break;
    //     default:
    //         console.log("There is not file for this day");
    //         break;
    // }

    var today3=new Date();
    var currentDay=today3.getDay();
    var day="";
    switch (currentDay) {
        case 0:
            day="Sunday";
            break;
            case 1:
            day="Monday";
            break;
            case 2:
            day="Tuesday";
            break;
            case 3:
            day="Wednesday";
            break;
            case 4:
            day="Thursday";
            break;
            case 5:
            day="Friday";
            break;
            case 6:
            day="Saturday";
            break;
        default:
            console.log("This is not a day");
            break;
    }
    res.render("list0",{kindofDay:day});
});

app.listen(3001,function(){
    console.log("Server is listening on port 3001");
})