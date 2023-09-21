import express from "express";
import cors from "cors";
import mysql from "mysql2";
import "dotenv/config";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Testdata APP listening on port ${port}`));

// establish database connection

const dbconfig = {
   host: process.env.MYSQL_HOST,
   database: process.env.MYSQL_DATABASE,
   user: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
};

if (process.env.MYSQL_CERT) {
   dbconfig.ssl = { cs: fs.readFileSync("DigiCertGlobalRootCA.crt.pem") };
}

const connection = mysql.createConnection(dbconfig);

// artists CRUD functions

// read / get

app.get("/artists", (request, response) => {
   const query = "SELECT * FROM artists ORDER BY name";
   connection.query(query, (error, results, fields) => {
      if (error) {
         console.log(error);
      } else {
         response.json(results);
      }
   });
});

// create / post

app.post("/artists", (request, response) => {
   const artist = request.body;
   const query = "INSERT INTO artists(name, image, genre) values(?,?,?);";
   const values = [artist.name, artist.image, artist.genre];

   connection.query(query, values, (error, results, fields) => {
      if (error) {
         console.log(error);
      } else {
         response.json(results);
      }
   });
});

// update / put

app.put("/artists/:id", (request, response) => {
   const id = request.params.id;
   const artist = request.body;
   const query = "UPDATE artists SET name=?, image=?, genre=? WHERE id=?;";
   const values = [artist.name, artist.image, artist.genre, id];

   connection.query(query, values, (error, results, fields) => {
      if (error) {
         console.log(error);
      } else {
         response.json(results);
      }
   });
});

// delete / delete

app.delete("/artists/:id", (request, response) => {
   const id = request.params.id;
   const query = "DELETE FROM artists WHERE id=?;";
   const values = [id];

   connection.query(query, values, (error, results, fields) => {
      if (error) {
         console.log(error);
      } else {
         response.json(results);
      }
   });
});

// albums CRUD functions

app.get("/albums", (request, response) => {
   const query = "SELECT * FROM albums  ORDER BY albumName";
   connection.query(query, (error, results, fields) => {
      if (error) {
         console.log(error);
      } else {
         response.json(results);
      }
   });
});

// songs CRUD functions

app.get("/songs", (request, response) => {
   const query = "SELECT * FROM songs ORDER BY songName";
   connection.query(query, (error, results, fields) => {
      if (error) {
         console.log(error);
      } else {
         response.json(results);
      }
   });
});
