// Use express
const express = require("express");
// Create app obj
const app = express();
// Set port
const port = 8888;
// Parsing post requests
const bodyParser = require("body-parser");
// Cors
var cors = require("cors");
// Logging
const morgan = require("morgan");

// Middleware
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("dev"));

// Connect to local sqlite3 db
var sqlite3 = require("sqlite3").verbose();

// Electron environment
let db_path = "./server/database.db";
// Node (for testing)
// let db_path = "./database.db";

var db = new sqlite3.Database(db_path);

/**
 * Add a trip to the trips table
 * Required JSON POST data:
 *  - name (TEXT)
 *  - startDate (TEXT)
 *  - endDate (TEXT)
 *  - image (BLOB)
 */
app.post("/addTrip", (req, res) => {
  // TODO: General checks
  // - Start date and end date are correct

  let data = req.body;

  // Checks if values exist
  if (!data.name || !data.startDate || !data.endDate || !data.image) {
    res.status(400);
    res.send({ status: "failed", msg: "Missing POST data." });
    return;
  }

  // Make sure dates make sense
  var sd;
  var ed;
  try {
    sd = new Date(data.startDate);
    ed = new Date(data.endDate);
  } catch (error) {
    res.status(400);
    res.send({ status: "failed", msg: "Could not interpret date." });
    return;
  }
  if (sd >= ed) {
    res.status(400);
    res.send({ status: "failed", msg: "Invalid date range." });
    return;
  }

  // sd = `${sd.getMonth()}/${sd.getDate()}/${sd.getFullYear()}`;
  // ed = `${ed.getMonth()}/${ed.getDate()}/${ed.getFullYear()}`;

  // SQL string
  add_trip_sql = `
    INSERT INTO trips (name,startDate, endDate, image)
    VALUES(?,?,?,?);
  `;

  // Run the query
  db.run(
    add_trip_sql,
    [data.name, sd.toString(), ed.toString(), data.image],
    (err) => {
      if (err) {
        res.status(500);
        res.send({ status: "failed", error: err });
      } else {
        res.send({ status: "success" });
      }
    }
  );
});

/**
 * returns JSON list of all trips
 */
app.get("/getTrips", (req, res) => {
  get_trips_sql = `
    SELECT * FROM trips;
  `;

  db.all(get_trips_sql, (err, rows) => {
    if (err) {
      res.status(500);
      res.send({
        status: "failed",
        msg: "An error occurred querying the database.",
      });
    } else {
      res.send({ status: "success", rows: rows });
    }
  });
});

/**
 * returns JSON list trips based on any of the following parameters:
 * - id
 * - name
 * - startDate
 * - endDate
 */
app.get("/getTrip", (req, res) => {
  let data = req.query;

  // Set undefined values to null
  if (!data.id) {
    data.id = "null";
  }
  if (!data.name) {
    data.name = "null";
  }
  if (!data.startDate) {
    data.startDate = "null";
  }
  if (!data.endDate) {
    data.endDate = "null";
  }

  // All data is null
  if (
    !data ||
    (data.id == "null" &&
      data.name == "null" &&
      data.startDate == "null" &&
      data.endDate == "null")
  ) {
    res.status(400);
    res.send({ status: "failed", msg: "No valid parameters supplied." });
    return;
  }

  get_trip_sql = `
    SELECT * FROM trips
    WHERE 
      ((id = (?)) OR ((?) = "null"))
      AND ((name = (?)) OR ((?) = "null"))
      AND ((startDate = (?)) OR ((?) = "null"))
      AND ((endDate = (?)) OR ((?) = "null"))    
    ;
  `;

  db.all(
    get_trip_sql,
    [
      data.id,
      data.id,
      data.name,
      data.name,
      data.startDate,
      data.startDate,
      data.endDate,
      data.endDate,
    ],
    (err, rows) => {
      if (err) {
        res.status(500);
        res.send({
          status: "failed",
          msg: "An error occurred querying the database.",
        });
      } else {
        res.send({ status: "success", rows: rows });
      }
    }
  );
});

/**
 * Update a trip in the trips table.
 * Required JSON POST data:
 * - id
 * - name
 * - startDate
 * - endDate
 * - image
 */
app.post("/updateTrip", (req, res) => {
  let data = req.body;

  // Checks if values exist
  if (
    !data.name ||
    !data.startDate ||
    !data.endDate ||
    !data.image ||
    !data.id
  ) {
    res.status(400);
    res.send({ status: "failed", msg: "Missing POST data." });
    return;
  }

  // Make sure dates make sense
  var sd;
  var ed;
  try {
    sd = new Date(data.startDate);
    ed = new Date(data.endDate);
  } catch (error) {
    res.status(400);
    res.send({ status: "failed", msg: "Could not interpret date." });
    return;
  }
  if (sd >= ed) {
    res.status(400);
    res.send({ status: "failed", msg: "Invalid date range." });
    return;
  }

  // SQL string
  update_trip_sql = `
    UPDATE trips
    SET
      name = (?),
      startDate = (?),
      endDate = (?),
      image = (?)
    WHERE id = (?);
  `;

  // Run the query
  db.run(
    update_trip_sql,
    [data.name, sd.toString(), ed.toString(), data.image, data.id],
    (err) => {
      if (err) {
        res.status(500);
        res.send({ status: "failed", error: err });
      } else {
        res.send({ status: "success" });
      }
    }
  );
});

/**
 * Delete a trip from trips table.
 * Required JSON POST data:
 *  - id
 */
app.post("/deleteTrip", (req, res) => {
  let data = req.body;
  // SQL string
  delete_trip_sql = `
    DELETE FROM trips
    WHERE id = (?);
  `;

  // Run the query
  db.run(delete_trip_sql, [data.id], (err) => {
    if (err) {
      res.status(500);
      res.send({ status: "failed", error: err });
    } else {
      res.send({ status: "success" });
    }
  });
});

/**
 * Add a journal to journals table.
 * Required JSON POST data:
 *  - trip_id (INTEGER)
 *  - date (TEXT)
 *  - content (TEXT)
 */
app.post("/addJournal", (req, res) => {
  // Build query
  add_journal_sql = `
  INSERT INTO journals (date,content, trip_id)
  VALUES(?,?,?);
  `;

  // Run the query
  db.run(
    add_journal_sql,
    [req.body.date, req.body.content, req.body.trip_id],
    (err) => {
      if (err) {
        res.status(500);
        res.send({ status: "failed", error: err });
      } else {
        res.send({ status: "success" });
      }
    }
  );
});

/**
 * Get a JSON list of all journals.
 */
app.get("/getJournals", (req, res) => {
  get_journals_sql = `
    SELECT * FROM journals;
  `;

  db.all(get_journals_sql, (err, rows) => {
    if (err) {
      res.status(500);
      res.send({
        status: "failed",
        msg: "An error occurred querying the database.",
      });
    } else {
      res.send({ status: "success", rows: rows });
    }
  });
});

/**
 * returns JSON list of journals based on any of the following parameters:
 * - id
 * - date
 * - trip_id
 */
app.get("/getJournal", (req, res) => {
  let data = req.query;

  // Set undefined values to null
  if (!data.id) {
    data.id = "null";
  }
  if (!data.date) {
    data.date = "null";
  }
  // if (!data.content) {
  //   data.startDate = "null";
  // }
  if (!data.trip_id) {
    data.trip_id = "null";
  }

  // All data is null
  if (
    !data ||
    (data.id == "null" &&
      data.name == "null" &&
      data.date == "null" &&
      data.trip_id == "null")
  ) {
    res.status(400);
    res.send({ status: "failed", msg: "No valid parameters supplied." });
    return;
  }

  get_journal_sql = `
    SELECT * FROM journals
    WHERE 
      ((id = (?)) OR ((?) = "null"))
      AND ((date = (?)) OR ((?) = "null"))
      AND ((trip_id = (?)) OR ((?) = "null"))    
    ;
  `;

  db.all(
    get_journal_sql,
    [
      data.id,
      data.id,
      data.date,
      data.date,
      // data.content,
      // data.content,
      data.trip_id,
      data.trip_id,
    ],
    (err, rows) => {
      if (err) {
        res.status(500);
        res.send({
          status: "failed",
          msg: "An error occurred querying the database.",
        });
      } else {
        res.send({ status: "success", rows: rows });
      }
    }
  );
});

/**
 * Update an existing journal entry in the journals table.
 * Required JSON POST data:
 *  - id (INTEGER)
 *  - content (TEXT)
 */
app.post("/updateJournal", (req, res) => {
  let data = req.body;

  if (!data.content || !data.id) {
    res.status(400);
    res.send({ status: "failed", msg: "Insufficient parameters supplied." });
    return;
  }

  // SQL string
  update_journal_sql = `
    UPDATE journals
    SET content = (?)
    WHERE id = (?);
  `;

  // Run the query
  db.run(update_journal_sql, [data.content, data.id], (err) => {
    if (err) {
      res.status(500);
      res.send({ status: "failed", error: err });
    } else {
      res.send({ status: "success" });
    }
  });
});

/**
 * Delete a journal from journals table
 * Required JSON POST data:
 *  - id
 */
app.post("/deleteJournal", (req, res) => {
  let data = req.body;

  if (!data.id) {
    res.status(400);
    res.send({ status: "failed", msg: "Insufficient parameters supplied." });
    return;
  }

  // SQL string
  delete_trip_sql = `
    DELETE FROM journals
    WHERE id = (?);
  `;

  // Run the query
  db.run(delete_trip_sql, [data.id], (err) => {
    if (err) {
      res.status(500);
      res.send({ status: "failed", error: err });
    } else {
      res.send({ status: "success" });
    }
  });
});

/**
 * Add a media item to the media table.
 * Required JSON POST data:
 *  - trip_id (INTEGER)
 *  - date (TEXT)
 *  - content (BLOB)
 */
app.post("/addMedia", (req, res) => {
  let data = req.body;

  // Build query
  add_journal_sql = `
  INSERT INTO media (date,content,trip_id)
  VALUES(?,?,?);
  `;

  // Run the query
  db.run(add_journal_sql, [data.date, data.content, data.trip_id], (err) => {
    if (err) {
      res.status(500);
      res.send({ status: "failed", error: err });
    } else {
      res.send({ status: "success" });
    }
  });
});

/**
 * Get all of the entries in the media table. No parameters.
 */
app.get("/getMedias", (req, res) => {
  let data = req.query;

  get_medias_query = `
    SELECT * FROM media;
  `;

  db.all(get_medias_query, (err, rows) => {
    if (err) {
      res.status(500);
      res.send({
        status: "failed",
        msg: "An error occurred querying the database.",
      });
    } else {
      res.send({ status: "success", rows: rows });
    }
  });
});

/**
 * Get entries in the media table.
 * Optional POST JSON parameters:
 *  - id
 *  - date
 *  - trip_id
 */
app.get("/getMedia", (req, res) => {
  let data = req.query;

  // Set undefined values to null
  if (!data.id) {
    data.id = "null";
  }
  if (!data.date) {
    data.date = "null";
  }
  if (!data.trip_id) {
    data.trip_id = "null";
  }

  // All data is null
  if (
    !data ||
    (data.id == "null" && data.date == "null" && data.trip_id == "null")
  ) {
    res.status(400);
    res.send({ status: "failed", msg: "No valid parameters supplied." });
    return;
  }

  get_media_sql = `
    SELECT * FROM media
    WHERE 
      ((id = (?)) OR ((?) = "null"))
      AND ((date = (?)) OR ((?) = "null"))
      AND ((trip_id = (?)) OR ((?) = "null"))
    ;
  `;

  db.all(
    get_media_sql,
    [data.id, data.id, data.date, data.date, data.trip_id, data.trip_id],
    (err, rows) => {
      if (err) {
        res.status(500);
        res.send({
          status: "failed",
          msg: "An error occurred querying the database.",
        });
      } else {
        res.send({ status: "success", rows: rows });
      }
    }
  );
});

/**
 * Update media in media table. I don't think this endpoint is nescessary.
 */
app.get("updateMedia", (req, res) => {
  res.send({ status: "failed", msg: "Endpoint not set up." });
});

/**
 * Delete media item from the media table.
 * Required JSON POST data:
 *  - id
 */
app.post("/deleteMedia", (req, res) => {
  let data = req.body;
  // SQL string
  delete_media_sql = `
    DELETE FROM media
    WHERE id = (?);
  `;

  // Run the query
  db.run(delete_media_sql, [data.id], (err) => {
    if (err) {
      res.status(500);
      res.send({ status: "failed", error: err });
    } else {
      res.send({ status: "success" });
    }
  });
});

// ADMIN ACTIONS

/**
 * Test if the server is up and responding
 */
app.get("/test", (req, res) => {
  res.send({ msg: "the server is up and running!" });
});

/**
 * Drop all tables
 */
app.post("/clear-db", (req, res) => {
  const delete_trips = `DROP TABLE IF EXISTS trips;`;
  const delete_journals = `DROP TABLE IF EXISTS journals;`;
  const delete_media = `DROP TABLE IF EXISTS media;`;

  db.run(delete_trips, [], (err) => {
    if (err) {
      res.send({ error: err });
    }
  });
  db.run(delete_journals, [], (err) => {
    if (err) {
      res.send({ error: err });
    }
  });
  db.run(delete_media, [], (err) => {
    if (err) {
      res.send({ error: err });
    }
  });

  res.send({ status: "success" });
});

/**
 * Create all nescessary tables
 */
app.post("/init-db", (req, res) => {
  const create_trips = `
    CREATE TABLE IF NOT EXISTS trips (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      startDate TEXT,
      endDate TEXT,
      image BLOB
    )`;

  const create_journals = `
    CREATE TABLE IF NOT EXISTS journals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      content TEXT,
      trip_id INTEGER,
      FOREIGN KEY(trip_id) REFERENCES trips(id)
    );`;

  const create_media = `
  CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    content BLOB,
    trip_id INTEGER,
    FOREIGN KEY(trip_id) REFERENCES trips(id)
  );`;

  db.run(create_trips, [], (err) => {
    if (err) {
      res.status(500);
      res.send({ status: "failed", error: err });
    }
  });

  db.run(create_journals, [], (err) => {
    if (err) {
      res.status(500);
      res.send({ status: "failed", error: err });
    }
  });

  db.run(create_media, [], (err) => {
    if (err) {
      res.status(500);
      res.send({ status: "failed", error: err });
    }
  });

  res.send({ status: "success" });
});

/**
 * Listen on port
 */
app.listen(port, () => {
  console.log(`Back-end server started on port ${port}`);
});
