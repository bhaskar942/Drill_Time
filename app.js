const express=require('express');
const bodyParser=require('body-parser');
const request = require("request");
const https=require("https");
const jalert = require('js-alert');

const app=express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

var l=["Warmup","Streching"];
var f=["Get the ingridients","Start Cooking"];
app.get("/",function(req,res){
  res.render("index");
});


app.get("/prelist",function(req,res){
  res.render("prelist");
});
app.get("/preFood",function(req,res){
  res.render("preFood");
});
app.post("/defaults",function(req,res){
  // console.log(req.body);
  const workoutName=req.body.tow;
  var l1=["Warmup","Streching"];
  res.render("defaults",{
    typeOfWorkout: workoutName,
    itemsArray: l1
  });
});
app.post("/defaultsFood",function(req,res){
  // console.log(req.body);
  const foodName=req.body.tof;
  var f1=["Get the ingridients","Start Cooking"];
  res.render("defaultsFood",{
    typeOfFood: foodName,
    itemsArray: f1
  });
});
app.post("/list",function(req,res){
  // console.log(req.body);
  // const exerciseName = req.body.newExercise;
  const workoutName = req.body.tow;//type of workout
  // l.push(exerciseName);
  var l1=["Warmup","Streching"];
  res.render("list",{
    typeOfWorkout: workoutName,
    itemsArray: l1
  });
});
app.post("/foodList",function(req,res){
  // console.log(req.body);
  // const foodName = req.body.newExercise;
  const foodName = req.body.tof;//type of workout
  // l.push(exerciseName);
  var f1=["Get the ingridients","Start Cooking"];
  res.render("foodList",{
    typeOfFood: foodName,
    itemsArray: f1
  });
});
app.post("/createNewExercise",function(req,res){
  console.log(req.body);
  const exerciseName = req.body.newExercise;
  const workoutName = req.body.tow;//type of workout
  l.push(exerciseName);
  res.render("list",{
    typeOfWorkout: workoutName,
    itemsArray: l
  });
});
app.post("/createNewFood",function(req,res){
  // console.log(req.body);
  const newFoodName = req.body.newFood;
  const foodName = req.body.tof;//type of workout
  f.push(newFoodName);
  res.render("foodList",{
    typeOfFood: foodName,
    itemsArray: f
  });
});
app.post("/delete",function(req,res){
  const workoutName = req.body.tow;//type of workout
  l=["Warmup","Streching"];
  res.render("list",{
    typeOfWorkout: workoutName,
    itemsArray: l
  });
});
app.post("/deleteFoodList",function(req,res){
  const foodName = req.body.tof;//type of workout
  f=["Get the ingridients","Start Cooking"];
  res.render("foodList",{
    typeOfFood: foodName,
    itemsArray: f
  });
});

app.post("/sub",function(req,res){
  const email=req.body.mail;
  const data={
    members:[
      {
        email_address: email,
        status: "subscribed",
        update_existing: true
      }
    ]
  };

  const jsonData=JSON.stringify(data);

  const url="https://us7.api.mailchimp.com/3.0/lists/da138be888";//endpoint

  const options={
    method:"POST",
    auth: "bhaskar:8f9ffcd34b57d01b1cc8abd80a9f6269-us7"//list id
  }

  const request=https.request(url,options,function(response){

    const statusCode=response.statusCode;
    // console.log(statusCode);



    if(statusCode==200)
    {
      jalert.alert("Success!");
    }
    else{
      jalert.alert("Failure!");
    }
      // response.on("data",function(data){
      //   //console.log(JSON.parse(data));
      // })

  });
  request.write(jsonData);
  request.end();
  res.redirect("/");
})

app.listen(3000,function(){
  console.log("Server running successfully");
});
// key : 8f9ffcd34b57d01b1cc8abd80a9f6269-us7
// lit id: da138be888
