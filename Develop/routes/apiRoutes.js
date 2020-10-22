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
          else {
              return res.json(JSON.parse(data));
          }
      })
    });
  
  
  
    // If no matching route is found default to home
    


  app.post("/api/notes", function(req, res) {
    var id = Math.floor(Math.random() * 100) + 1;
    req.body.id = id;
      
    //   toJson.push(JSON.stringify(req.body))
    
    notes.allNotes.push(req.body);
    // allNotes.id = id;
    var newJson = JSON.stringify(notes)
    
 fs.writeFile('db.json', newJson, 'utf8', (err)=>{
            if(err){
                console.log(err)
            }
        })
     res.json(req.body);
    
    
    
    });

    app.delete("/api/notes/:id",function(req,res){
        var id = req.params.id;
        fs.readFile("db.json","utf8",function readFile(err,data){
            if(err){
                console.log(err);
            }
            else{
                var data = JSON.parse(data);
               var  result = data.allNotes;
                for(var i=0;i<result.length ; i++) {
                    if(id == result[i].id) {
                        console.log('checking')
                        result.splice(i,1);
                        console.log(result);
                        notes.allNotes = result;
                        var newNotes = JSON.stringify(notes)
                        fs.writeFile("db.json",newNotes,function(err){
                            if(err){
                                throw err;
                            }
                        })
                    }
                }
                
            
            }
           
        
        })
        res.json(true);


    })
};

