var path = require("path");
var fs = require("fs");

module.exports = function (app) {
    var notes = {
        allNotes: []
    };


    app.get("/api/notes", function (req, res) {
        fs.readFile("./db/db.json", "utf8", function readFile(err, data) {
            var notes;
            if (err) {
                console.log(err);
            }
            else {
                notes = JSON.parse(data);

            }
        })
        res.json(notes);
    });






    app.post("/api/notes", function (req, res) {
        if(notes.allNotes.length== 0){
        var id = 1;
        // var id = Math.floor(Math.random() * 100) + 1;
        req.body.id = id;}
        else{
           var newId= notes.allNotes[notes.allNotes.length-1].id;
           newId++;
           req.body.id =newId;

        }
      notes.allNotes.push(req.body);
        var newJson = JSON.stringify(notes, null , 2)

        fs.writeFile('./db/db.json', newJson, 'utf8', (err) => {
            if (err) {
                console.log(err)
            }
        })
        res.json(req.body);



    });

    app.delete("/api/notes/:id", function (req, res) {
        var id = req.params.id;
        fs.readFile("./db/db.json", "utf8", function readFile(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                var data = JSON.parse(data);
                var result = data.allNotes;
                for (var i = 0; i < result.length; i++) {
                    if (id == result[i].id) {
                        result.splice(i, 1);
                        notes.allNotes = result;
                        var newNotes = JSON.stringify(notes, null , 2)
                        fs.writeFile("./db/db.json", newNotes, function (err) {
                            if (err) {
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

