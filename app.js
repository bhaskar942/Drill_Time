const express=require('express');
const bodyParser=require('body-parser');
const request = require("request");
const https=require("https");
const jalert = require('js-alert');
const mongoose = require('mongoose');
const _=require("lodash")

const app=express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://bhaskar942:bhaskar0002@cluster0.wqkwh.mongodb.net/drillTimeDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});


var l=["Warmup","Streching"];
var back=["Lat Pull Down - 3*12","One Arm - 6*10","Reverse Grip Pull Down - 3*12", "Barbell Row - 6*10", "Close Grip Pulldown - 3*12","Rack Pulls - 6*10"];
var biceps=["Barbel Curl - 6*8","Dumbell Curl - 3*15", "Preacher Curl (close grip) - 3*15","Plate Curls - 3*15"];
var shoulder=["Barbell Shoulder Press - 4*10","Dumbell Press - 4*10","Front Raise - 4*15","Side Raise - 4*15","Bendover Delt Fly - 4*15","Face Pulls - 3*25","Barbell Shrugs - 8*8"];
var legs=["Barbell Squats - 8*12","Lunges - 6*12","Leg Extension - 3*33","Leg Curls - 3*33","Leg Press - 6*12-15","Calves - 4*50"];
var chest=["Chest Press (Barbell) - 4*10","Flat Dumbell Fly - 4*10","Barbell Incline Press - 4*10","Incline Dumbell Fly - 4*10","Peck Deck Fly - 6*12"];
var f=["Get the ingridients","Start Cooking"];
var breakfast=["Eggs","Greek Yogurt","Pancakes","Poha","Upma","Rava Dosa","Oat Meal"];
var carbs=["Potatoes","Sweet Potatoes","Bread","Rice"];
var proteins=["Legumes","Eggs","Whey Protein","Cottage Cheese","Chickpeas","Chicken","Fish"];

const itemsSchema = {
  name: String
} //schema making
const ItemE = mongoose.model("ItemE", itemsSchema); //model making
const item1 = new ItemE({
  name: "Warmup"
}); //document 1 making
const item2 = new ItemE({
  name: "Stretching"
}); //document 2 making
 //document 3 making
const defaultItemsE = [item1,item2]; //document array making

const listSchema={
  name: String,
  items: [itemsSchema]
};
const ListE=mongoose.model("ListE",listSchema);

const ItemF = mongoose.model("ItemF", itemsSchema); //model making
const item3 = new ItemF({
  name: "Get the ingridients"
}); //document 1 making
const item4 = new ItemF({
  name: "Start Cooking"
}); //document 2 making
 //document 3 making
const defaultItemsF = [item3,item4]; //document array making

const ListF=mongoose.model("ListF",listSchema);

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


  if(workoutName==="back"){
    res.render("defaults",{
      typeOfWorkout: workoutName,
      itemsArray: back
    });
  }
  else if(workoutName==="biceps"){
    res.render("defaults",{
      typeOfWorkout: workoutName,
      itemsArray: biceps
    });
  }
  else if(workoutName==="shoulder"){
    res.render("defaults",{
      typeOfWorkout: workoutName,
      itemsArray: shoulder
    });
  }
  else if(workoutName==="legs"){
    res.render("defaults",{
      typeOfWorkout: workoutName,
      itemsArray: legs
    });
  }
  else if(workoutName==="chest"){
    res.render("defaults",{
      typeOfWorkout: workoutName,
      itemsArray: chest
    });
  }
  // res.render("defaults",{
  //   typeOfWorkout: workoutName,
  //   itemsArray: l1
  // });
});
app.post("/defaultsFood",function(req,res){
  // console.log(req.body);
  const foodName=req.body.tof;
  if(foodName==="breakfast"){
    res.render("defaultsFood",{
      typeOfFood: foodName,
      itemsArray: breakfast
    });
  }
  else if(foodName==="carbs"){
    res.render("defaultsFood",{
      typeOfFood: foodName,
      itemsArray: carbs
    });
  }
  else if(foodName==="proteins"){
    res.render("defaultsFood",{
      typeOfFood: foodName,
      itemsArray: proteins
    });
  }
});
app.post("/list",function(req,res){
  // console.log(req.body);
  // const exerciseName = req.body.newExercise;
  const workoutName = _.capitalize(req.body.tow);//type of workout
  // l.push(exerciseName);
  // var l1=["Warmup","Streching"];


  ListE.findOne({name: workoutName},function(err,foundList){
    if(err){
      console.log(err);
    }
    else{
      // console.log(foundList);
      if(!foundList){
        console.log("Doesn't Exists!");//so create a new list
        const newWorkout=new ListE({
          name: workoutName,
          items: defaultItemsE
        });
        // console.log("new item created");
        // const redTo="/"+customListName;
        newWorkout.save();
        // console.log("and saved");
        res.render("list",{
          typeOfWorkout: newWorkout.name,
          itemsArray: newWorkout.items
        });
      }
      else{
        console.log("Exists!");//show an existing list
        res.render("list",{
          typeOfWorkout: foundList.name,
          itemsArray: foundList.items
        });
      }
    }

  });
});

app.post("/foodList",function(req,res){
  // console.log(req.body);
  // const foodName = req.body.newExercise;
  // const foodName = req.body.tof;//type of workout
  // // l.push(exerciseName);
  // var f1=["Get the ingridients","Start Cooking"];
  // res.render("foodList",{
  //   typeOfFood: foodName,
  //   itemsArray: f1
  // });
  const foodName = _.capitalize(req.body.tof);//type of workout
  // l.push(exerciseName);
  // var l1=["Warmup","Streching"];


  ListF.findOne({name: foodName},function(err,foundList){
    if(err){
      console.log(err);
    }
    else{
      // console.log(foundList);
      if(!foundList){
        console.log("Doesn't Exists!");//so create a new list
        const newFood=new ListF({
          name: foodName,
          items: defaultItemsF
        });
        // console.log("new item created");
        // const redTo="/"+customListName;
        newFood.save();
        // console.log("and saved");
        res.render("foodList",{
          typeOfFood: newFood.name,
          itemsArray: newFood.items
        });
      }
      else{
        console.log("Exists!");//show an existing list
        res.render("foodList",{
          typeOfFood: foundList.name,
          itemsArray: foundList.items
        });
      }
    }

  });
});

app.post("/createNewExercise",function(req,res){

  // console.log(req.body);

  const exerciseName = req.body.newExercise;
  const workoutName = _.capitalize(req.body.tow);//type of workout
  const newItemDoc= new ItemE({
    name: exerciseName
  });

    ListE.findOne({name: workoutName},function(err,foundList){
      if(err){
        console.log(err);
      }
      else{
        foundList.items.push(newItemDoc);
        foundList.save();
        res.render("list",{
          typeOfWorkout: foundList.name,
          itemsArray: foundList.items
        });
      }
    });

});

app.post("/createNewFood",function(req,res){
  // console.log(req.body);
  // const newFoodName = req.body.newFood;
  // const foodName = req.body.tof;//type of workout
  // f.push(newFoodName);
  // res.render("foodList",{
  //   typeOfFood: foodName,
  //   itemsArray: f
  // });
  const newFoodName = req.body.newFood;
  const foodName = _.capitalize(req.body.tof);//type of workout
  const newItemDoc= new ItemF({
    name: newFoodName
  });

    ListF.findOne({name: foodName},function(err,foundList){
      if(err){
        console.log(err);
      }
      else{
        foundList.items.push(newItemDoc);
        foundList.save();
        res.render("foodList",{
          typeOfFood: foundList.name,
          itemsArray: foundList.items
        });
      }
    });
});
app.post("/delete",function(req,res){
  const workoutName = _.capitalize(req.body.tow);//type of workout
  // l=["Warmup","Streching"];
  // res.render("list",{
  //   typeOfWorkout: workoutName,
  //   itemsArray: l
  // });
  ListE.findOneAndUpdate({name: workoutName},{items: defaultItemsE},function(err,foundList){
    if(err){
      console.log(err);
    }
    else{
      console.log("succesfully cleared list");
    }
  });
  ListE.findOne({name: workoutName},function(err,foundList){
    if(err){
      console.log(err);
    }
    else{
      // console.log(foundList);
        // console.log("Exists!");//show an existing list
        res.render("list",{
          typeOfWorkout: foundList.name,
          itemsArray: foundList.items
        });
    }
  });
});
app.post("/deleteFoodList",function(req,res){

  // const foodName = req.body.tof;//type of workout
  // f=["Get the ingridients","Start Cooking"];
  // res.render("foodList",{
  //   typeOfFood: foodName,
  //   itemsArray: f
  // });

  const foodName = _.capitalize(req.body.tof);//type of workout
  // l=["Warmup","Streching"];
  // res.render("list",{
  //   typeOfWorkout: workoutName,
  //   itemsArray: l
  // });
  ListF.findOneAndUpdate({name: foodName},{items: defaultItemsF},function(err,foundList){
    if(err){
      console.log(err);
    }
    else{
      console.log("succesfully cleared list");
    }
  });
  ListF.findOne({name: foodName},function(err,foundList){
    if(err){
      console.log(err);
    }
    else{
      // console.log(foundList);
        // console.log("Exists!");//show an existing list
        res.render("foodList",{
          typeOfFood: foundList.name,
          itemsArray: foundList.items
        });
    }
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

let port=process.env.PORT;
if(port==null || port=="")
{
  port=3000;
}
app.listen(port,function(){
  console.log("Server running successfully");
});
// key : 8f9ffcd34b57d01b1cc8abd80a9f6269-us7
// lit id: da138be888
