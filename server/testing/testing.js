const { id } = require("date-fns/locale");
const fetch = require("node-fetch");

// Colors
FgRed = "\x1b[31m";
FgGreen = "\x1b[32m";
FgYellow = "\x1b[33m";
FgBlue = "\x1b[34m";
FgMagenta = "\x1b[35m";
FgCyan = "\x1b[36m";
FgWhite = "\x1b[37m";
Reset = "\x1b[0m";

// POST Request function
sendPostReq = async (postData, endpoint, print = true, debug = false) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  };

  response = await fetch(`http://localhost:8888/${endpoint}`, requestOptions);

  if (debug) {
    console.log(response);
  }

  data = await response.json();
  if (print) {
    console.log(FgYellow + "\t" + JSON.stringify(data) + "\n" + Reset);
  }
};

// GET Request function
sendGetReq = async (params, endpoint, print = true) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  let paramsEncoded = "" + new URLSearchParams(params);
  response = await fetch(
    `http://localhost:8888/${endpoint}?${paramsEncoded}`,
    requestOptions
  );
  data = await response.json();
  if (print) {
    console.log(FgYellow + "\t" + JSON.stringify(data) + "\n" + Reset);
  }
};

main = async () => {
  var endpoint;
  var postDate;

  // Trip testing
  console.log(FgCyan + "######## Testing trip CRUD ##########\n" + Reset);
  endpoint = "addTrip";

  // Missing post data
  console.log(FgCyan + "\tTest for missing POST data:" + Reset);
  postData = {
    hey: "test",
  };
  await sendPostReq(postData, endpoint);

  // Incorrect dates
  console.log(FgCyan + "\tTest for incorrect dates:" + Reset);
  let d1 = new Date("12/25/2020");
  let d2 = new Date("12/23/2020");

  postData = {
    name: "Test Name",
    startDate: `${d1.getMonth()}/${d1.getDate()}/${d1.getFullYear()}`,
    endDate: `${d2.getMonth()}/${d2.getDate()}/${d2.getFullYear()}`,
    image: "image_here",
  };
  await sendPostReq(postData, endpoint);

  // Adding trip
  console.log(FgCyan + "\tTest add trip:" + Reset);

  let n = "test_name";
  let sd = "8/13/1999";
  let ed = "8/14/1999";
  let im = "image";
  postData = {
    name: n,
    startDate: sd,
    endDate: ed,
    image: im,
  };
  await sendPostReq({}, "clear-db", false);
  await sendPostReq({}, "init-db", false);
  await sendPostReq(postData, endpoint);
  await sendGetReq({}, "getTrips");

  // Updating trip
  console.log(FgCyan + "\tTest update trip:" + Reset);
  endpoint = "updateTrip";
  n = "updated_name";
  sd = "8/18/2020";
  ed = "8/19/2020";
  im = "updated_image";
  let id = 1;
  postData = {
    name: n,
    startDate: sd,
    endDate: ed,
    image: im,
    id: id,
  };
  await sendPostReq(postData, endpoint);
  await sendGetReq({}, "getTrips");

  // Deleting trip
  console.log(FgCyan + "\tTest delete trip:" + Reset);
  id = 1;
  endpoint = "deleteTrip";
  postData = {
    id: id,
  };
  await sendPostReq(postData, endpoint);
  await sendGetReq({}, "getTrips");

  // Getting trip (on conditions)
  console.log(FgCyan + "\tTest get trip:" + Reset);

  endpoint = "addTrip";
  n = "test_name";
  sd = "8/13/1999";
  ed = "8/14/1999";
  im = "image";
  postData = {
    name: n,
    startDate: sd,
    endDate: ed,
    image: im,
  };
  await sendPostReq(postData, endpoint, false);

  endpoint = "getTrip";
  await sendGetReq({ id: 2 }, endpoint);

  // Journals testing
  console.log(FgCyan + "######## Testing journals CRUD ##########\n" + Reset);
  endpoint = "addJournal";

  // Add journal
  console.log(FgCyan + "\tTest add journal:" + Reset);

  let d = "8/13/1999";
  let content = "test_content";
  let trip_id = 2;
  postData = {
    date: d,
    content: content,
    trip_id: trip_id,
  };

  await sendPostReq(postData, endpoint);
  await sendGetReq({}, "getJournals");

  // Get journal
  console.log(FgCyan + "\tTest get journal:" + Reset);
  endpoint = "getJournal";
  await sendGetReq({ trip_id: trip_id }, endpoint);

  // Update journal
  console.log(FgCyan + "\tTest update journal:" + Reset);
  endpoint = "updateJournal";
  content = "updated_content";
  id = 1;
  postData = {
    content: content,
    id: id,
  };

  await sendPostReq(postData, endpoint);
  await sendGetReq({ id: id }, "getJournal");

  // Delete journal
  console.log(FgCyan + "\tTest delete journal:" + Reset);
  endpoint = "deleteJournal";
  postData = {
    id: id,
  };
  await sendPostReq(postData, endpoint);
  await sendGetReq({}, "getJournals");

  // Media testing
  console.log(FgCyan + "######## Testing media CRUD ##########\n" + Reset);

  // Add media
  console.log(FgCyan + "\tTest add media:" + Reset);
  endpoint = "addMedia";
  trip_id = "3";
  date = "4/15/1985";
  content = "I am a media!";
  postData = {
    trip_id: trip_id,
    date: date,
    content: content,
  };

  await sendPostReq(postData, endpoint);
};

console.log("Beginning backend testing...");
main();
