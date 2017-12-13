var w = 720;
var h = 400;
var myFont;
var database;
var config;
var input;
var user;
var id;
var currentpage = 0;
var notes = ["","","",""];
var name = "";

function preload()
{
  myFont = loadFont('RussoOne-Regular.ttf');
}

function setup()
{
  w = windowWidth;
  h = windowHeight;
  // Initialize Firebase
  config =
  {
   apiKey: "AIzaSyDfUa6-qzp7sYs6o5-d9uLOZiQMFgG21YE",
   authDomain: "notes-ae3dd.firebaseapp.com",
   databaseURL: "https://notes-ae3dd.firebaseio.com",
   projectId: "notes-ae3dd",
   storageBucket: "notes-ae3dd.appspot.com",
   messagingSenderId: "57308214683"
  };
  var c = createCanvas(w, h);
  if(0 == 0) //Just to be able to conceal everything cause it was very long and annoying
  {
    input = createElement("textarea");
    input.position(w*3, h*0.12);
    input.size(w-w*0.03,h-h*0.2);

    buttonSave = createButton("📄");
    buttonSave.style("background-color", "#3898ec");
    buttonSave.style("border", "none");
    buttonSave.style("font-size", "5vh");
    buttonSave.position(w*3-w*0.05,15);
    buttonSave.mousePressed(Upload);

    buttonHome = createButton("🏠");
    buttonHome.style("background-color", "#3898ec");
    buttonHome.style("border", "none");
    buttonHome.style("font-size", "5vh");
    buttonHome.position(w*3-w*0.1,15);
    buttonHome.mousePressed(PageZero);

    buttonOne = createButton("💾");
    buttonOne.style("background-color", color(56*0.8,152*0.8,236*0.8));
    buttonOne.style("border", "none");
    buttonOne.style("font-size", "5vh");
    buttonOne.position(10,150+15);
    buttonOne.mousePressed(PageOne);

    buttonTwo = createButton("💾");
    buttonTwo.style("background-color", color(56*0.8,152*0.8,236*0.8));
    buttonTwo.style("border", "none");
    buttonTwo.style("font-size", "5vh");
    buttonTwo.position(10,150*2+15);
    buttonTwo.mousePressed(PageTwo);

    buttonThree = createButton("💾");
    buttonThree.style("background-color", color(56*0.8,152*0.8,236*0.8));
    buttonThree.style("border", "none");
    buttonThree.style("font-size", "5vh");
    buttonThree.position(10,150*3+15);
    buttonThree.mousePressed(PageThree);

    buttonFour = createButton("💾");
    buttonFour.style("background-color", color(56*0.8,152*0.8,236*0.8));
    buttonFour.style("border", "none");
    buttonFour.style("font-size", "5vh");
    buttonFour.position(10,150*4+15);
    buttonFour.mousePressed(PageFour);
  }
  textFont(myFont);
  login();
}

function draw()
{
  background("#3898ec");
  //Text
  fill(255, 255, 255);
  textAlign(LEFT,CENTER);
  textSize(w/20);
  text("Notes", w*0.01, h*0.075-10);
  textSize(w/100);
  text("By Conradical", w*0.16, h*0.095);

  if(currentpage == 0)
  {
    for(i = 1; i<5; i++)
    {
      //Background rectangle divider
      fill(56*0.7,152*0.7,236*0.7);
      stroke(56*0.8,152*0.8,236*0.8);
      rect(0, 150*i, w, 100);
      //Rectangle divider
      fill(56*0.8,152*0.8,236*0.8);
      stroke(56*0.8,152*0.8,236*0.8);
      rect(0, 150*i-3, w, 100);
    }
    for(i = 0; i<4; i++)
    {
      textSize(w/50);
      fill(255, 255, 255);
      text(notes[i].substring(0,80)+"...",75, 150*(i+1)+40);
    }
  }
  if(currentpage !== 0)
  {
    buttonOne.position(w*3,0);
    buttonTwo.position(w*3,0);
    buttonThree.position(w*3,0);
    buttonFour.position(w*3,0);
    buttonSave.position(w-w*0.05,15);
    buttonHome.position(w-w*0.1,15);
    input.position(w*0.01, h*0.15);
  }
}
function Upload()
{
for(i = 0; i<4; i++)
  {
    if(currentpage == i+1)
    {
      notes[i] = input.value();
    }
  }
  console.log(notes);
  //Send data
  database = firebase.database();
  var ref = database.ref("people/" + id);
  //ref.on("value", gotData, errData);
  var data =
  {
   name: name,
   notesA: notes[0],
   notesB: notes[1],
   notesC: notes[2],
   notesD: notes[3]
  }
  ref.push(data);
}
function PageZero()
{
  currentpage = 0;
  input.position(w*3, h*0.12);
  buttonSave.position(w*3-w*0.05,15);
  buttonHome.position(w*3-w*0.1,15);
  buttonOne.position(10,150+15);
  buttonTwo.position(10,150*2+15);
  buttonThree.position(10,150*3+15);
  buttonFour.position(10,150*4+15);
  Upload();
  
}
function PageOne()
{
  currentpage = 1;
  input.value(notes[0]);
}
function PageTwo()
{
  currentpage = 2;
  input.value(notes[1]);
}
function PageThree()
{
  currentpage = 3;
  input.value(notes[2]);
}
function PageFour()
{
  currentpage = 4;
  input.value(notes[3]);
}

function login()
{
    firebase.initializeApp(config);
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result)
    {
     // This gives you a Google Access Token. You can use it to access the Google API.
     var token = result.credential.accessToken;
     // The signed-in user info.
     user = result.user;
     id = user.uid;
     load();
   }).catch(function(error){
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
     // The email of the user's account used.
     var email = error.email;
     // The firebase.auth.AuthCredential type that was used.
     var credential = error.credential;
   });
}

function load()
{
  database = firebase.database();
  var ref = database.ref("people/" + id);
  ref.on("value", gotData, errData);
}

function gotData(data)
{
  //Save the notes
   var layer1 = data.val();
   var layer2 = Object.values(layer1);
   var layer3 = layer2[layer2.length-1];
   layer4 = Object.values(layer3);
   name = layer4[0];
   for(i = 0; i<4; i++)
   {
     notes[i] = layer4[i+1];
   }
}

function errData(err)
{
   console.log("Error:");
   console.log(err);
}
