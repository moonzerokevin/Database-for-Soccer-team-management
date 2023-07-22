const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const cors = require('cors');
app.use(cors())

// ------------------------------------------------------------------------------------------------------
// For SQLite:
const sqlite3 = require('sqlite3').verbose();
// For local dish db connection:
let db = new sqlite3.Database('./cpsc_304_database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the cpsc304 database.');
});

db.run("PRAGMA foreign_keys = ON", err => {
    if (err) {
      console.error("Could not enable foreign key support", err);
    }
  });
  
// db.serialize(() => {
//     db.each(`SELECT *
//              FROM League`
//         , (err, row) => {
//             if (err) {
//                 console.error(err.message);
//             }
//             console.log(row);
//         });
// });


// db.close((err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Close the database connection.');
// });



// ------------------------------------------------------------------------------------------------------
// // In memory db connection:
// // open database in memory
// let db = new sqlite3.Database(':memory:', (err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Connected to the in-memory SQlite database.');
// });

// // close the database connection
// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Close the database connection.');
// });





// ------------------------------------------------------------------------------------------------------
// Express.js setup:
app.use(express.json())

app.listen(PORT, () => console.log(`app alive on http://localhost:${PORT}`)
)




// ------------------------------------------------------------------------------------------------------
// GET methods:

app.get('/tshirt', (req, res) => {

    let result = [];
    result.push("abc")

    res.status(200).send({
        size: "abc",
        testArray: result
    })
})

// app.get('/testDBWithLeague1', (req, res) => {

//     let result = [];

//     db.serialize(() => {
//         db.each(`SELECT *
//                  FROM League`
//             , (err, row) => {
//                 if (err) {
//                     console.error(err.message + "errorrrrrr");
//                 }
//                 console.log(row);
//                 result.push(row);
//             });
//     });

//     res.status(200).send({
//         testing: result,
//         testing2: resultJson
//     })
// })

app.get('/Insert/:playerType/:playerName/:jerseyNumber/:teamName/:skillPoint/:salary', (req, res) => {

    const { playerType, playerName, jerseyNumber, teamName, skillPoint, salary } = req.params;

    const skillMap = {
        "Forward": "Shooting_Skill",
        "Defender": "Defensive_Skill",
        "Goalkeeper": "Saving_Skill",
        "Midfielder": "Striking_Skill"
    };

    const skillName = skillMap[playerType];

    let sql = `INSERT INTO ${playerType} (Name, Jersey_Number, T_NAME, ${skillName}, Salary) VALUES 
                (?, ?, ?, ?, ?);
                `;

    db.run(sql, [playerName, jerseyNumber, teamName, skillPoint, salary], function (err) {
        if (err) {
            return res.status(500).send({ message: "Error inserting data", error: err });
        }

        return res.status(200).send({ message: `Rows inserted: ${this.changes}`,
                                        data: {
                                            playerType: playerType,
                                            playerName: playerName,
                                            jerseyNumber: jerseyNumber,
                                            teamName: teamName,
                                            skillPoint: skillPoint,
                                            salary: salary
                                        }});
    });
})

app.get('/Delete/:BrandName', (req, res) => {

    let BrandName = req.params.BrandName;

    let sql = `DELETE FROM Sponsor
                WHERE brand_name = ?`;

    db.run(sql, [BrandName], function (err) {
        if (err) {
            return res.status(500).send({ message: "Error deleting data", error: err });
        }

        return res.status(200).send({
            message: `Rows deleted: ${this.changes}`,
            data: {
                BrandName: BrandName
        }});
    });
});

app.get('/Update/:Price/:Venue', (req, res) => {

    let Price = req.params.Price;
    let Venue = req.params.Venue;

    let sql = `UPDATE Match_Contians_Officiates_Venue
                SET TicketPrice = ?
                WHERE Venue = ?
                `;

    db.run(sql, [Price, Venue], function (err) {
        if (err) {
            return res.status(500).send({ message: "Error updating data", error: err });
        }

        return res.status(200).send({
            message: `Rows updated: ${this.changes}`,
            data: {
                Price: Price,
                Venue: Venue
        }});
    });
});

app.get('/Select/:tableName/:attribute1/:operation1/:desiredValue1/:operation2?/:attribute2?/:operation3?/:desiredValue2?', (req,res) => {
    const {tableName, attribute1, operation1, desiredValue1, operation2, attribute2,  operation3, desiredValue2} = req.params;

    let result = [];
    
    let sql;
    
    if (operation2 === 'none' || !operation2) {
        sql = `SELECT *
               FROM ${tableName}
               WHERE ${attribute1} ${operation1} ?`;
    } else {
        sql = `SELECT *
               FROM ${tableName}
               WHERE ${attribute1} ${operation1} ? ${operation2} ${attribute2} ${operation3} ?`;
    }
    let values = [desiredValue1];
    if (operation2 !== 'none' && operation2) {
        values.push(desiredValue2);
    }
    db.all(sql, values, (err, rows) => {
        if (err) {
            return res.status(500).send({ message: "Error Select data", error: err });
        }
        
        rows.forEach((row) => {
            console.log(row);
            result.push(row)
        });

        res.status(200).send({
            result: result,
        })
    });
});


app.get('/PROJECTION/:tableName/:setOfAttributes', (req,res) => {

    let tableName = req.params.tableName;
    let setOfAttributes = req.params.setOfAttributes;

    let result = [];
    let sql = `SELECT ${setOfAttributes}
              FROM ${tableName}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).send({ message: "Error projection data", error: err });
        }

        rows.forEach((row) => {
            console.log(row);
            result.push(row)
        });

        res.status(200).send({
            result: result,
        })
    });
})

app.get('/Join/:teamName', (req, res) => {

    let teamName = req.params.teamName;

    let result = [];

    let sql = `SELECT Compete.team1_name, Compete.team2_name, Match_Contians_Officiates_Time.Score
                FROM Compete
                JOIN Match_Contians_Officiates_Time ON Compete.match_time = Match_Contians_Officiates_Time.Time
                                                AND Compete.match_venue = Match_Contians_Officiates_Time.Venue
                WHERE Compete.team1_name = ? OR Compete.team2_name = ?;   
                `;

    db.all(sql, [teamName, teamName], (err, rows) => {
        if (err) {
            return res.status(500).send({ message: "Error Join data", error: err });
        }

        rows.forEach((row) => {
            console.log(row);
            result.push(row)
        });

        res.status(200).send({
            result: result,
        })
    });
})

app.get('/Aggregation_with_GROUP_BY', (req, res) => {

    let result = [];

    let sql = `SELECT Age, AVG(Salary) AS Average_Salary
                FROM Coach_Associate_with
                GROUP BY Age;     
                `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).send({ message: "Error Aggregation", error: err });
        }

        rows.forEach((row) => {
            console.log(row);
            result.push(row)
        });

        res.status(200).send({
            result: result,
        })
    });
})

app.get('/Nested_Aggregation_with_GROUP_BY', (req, res) => {

    let result = [];

    let sql = `SELECT CA.T_NAME, CA.Name, MIN(CA.Age) As Age
                FROM Coach_Associate_with CA
                JOIN Team T ON T.Team_name = CA.T_NAME
                GROUP BY CA.T_NAME;    
                `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).send({ message: "Error Nested_Aggregation", error: err });
        }

        rows.forEach((row) => {
            console.log(row);
            result.push(row)
        });

        res.status(200).send({
            result: result,
        })
    });
})

app.get('/Aggregation_with_HAVING', (req, res) => {

    let result = [];

    let sql = `SELECT T.Team_name, MAX(F.Salary) AS Max_Salary
                FROM Team T
                JOIN Forward F ON T.Team_name = F.T_NAME
                GROUP BY T.Team_name
                HAVING MAX(F.Salary) > 200000;
                `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).send({ message: "Error Aggregation_with_HAVING", error: err });
        }

        rows.forEach((row) => {
            console.log(row);
            result.push(row)
        });

        res.status(200).send({
            result: result,
        })
    });
})

app.get('/Division', (req, res) => {

    let result = [];

    let sql = `SELECT S.Brand_name
                FROM Sponsor S
                WHERE NOT EXISTS (
                SELECT T.Team_name
                FROM Team T
                WHERE NOT EXISTS (
                    SELECT *
                    FROM Sponsor_Sponses SS
                    WHERE SS.S_Brand_name = S.Brand_name
                    AND SS.T_Name = T.Team_name
                )
                )`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).send({ message: "Error Division", error: err });
        }

        rows.forEach((row) => {
            console.log(row);
            result.push(row)
        });

        res.status(200).send({
            result: result,
        })
    });
})



// ---------------------------------
app.get('/Test1/:tableName', (req, res) => {

    let tableName = req.params.tableName;

    let result = [];

    let sql = `SELECT *
                FROM ${tableName} 
                `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        rows.forEach((row) => {
            console.log(row);
            result.push(row)
        });

        res.status(200).send({
            result: result,
        })
    });
})



app.get('/testDBWithLeague2', (req, res) => {

    let result = [];

    let sql = `SELECT * 
                FROM League`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
            result.push(row)
        });

        res.status(200).send({
            result: result,
        })
    });
})


app.get('/testDBWithLeague3/:keyword', (req, res) => {
    const { keyword } = req.params;

    let result = [];

    let sql = `SELECT ${keyword} 
                FROM League`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
            result.push(row)
        });

        res.status(200).send({
            result: result,
        })
    });
})

app.get('/insertPlayer/:keyword', (req, res) => {
    const { keyword } = req.params;

    let result = [];

    let sql = `SELECT ${keyword} 
                FROM League`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
            result.push(row)
        });

        res.status(200).send({
            result: result,
        })
    });
})



// ------------------------------------------------------------------------------------------------------
// POST methods:

app.post('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;

    if (!logo) {
        res.status(418).send({ message: "we need a logo!" })
    }

    res.send({
        tshirt: `with your ${logo} and ID of ${id}`
    })
})
