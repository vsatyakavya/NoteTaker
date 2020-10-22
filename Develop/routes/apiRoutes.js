var path = require("path");
var fs = require("fs");
// var toJson = { allNotes:[]}

module.exports = function(app) {
    var notes = {
        allNotes: []
     };
   
    app.get("/api/notes", function(req, res) {
      fs.readFile("db.json","utf8",function readFile(err,data){
          if(err){
              console.log(err);
          }
          else{
              console.log(data)
              return res.json(JSON.parse(data));
          }
      })
    });
  
  
  
    // If no matching route is found default to home
    


  app.post("/api/notes", function(req, res) {
    //   toJson.push(JSON.stringify(req.body))
    notes.allNotes.push(req.body);
    var newJson = JSON.stringify(notes)
    
    
    // var saveJson = JSON.stringify(toJson, null, 4)

        fs.writeFile('db.json', newJson, 'utf8', (err)=>{
            if(err){
                console.log(err)
            }
        })

    //  var newData = JSON.stringify(req.body);
    //   db.json.push(newData);
     res.json(req.body);
    
    
    
    });
}

