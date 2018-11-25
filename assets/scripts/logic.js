$(document).ready(function () {
  // Initialize Firebase

  var config = {
      apiKey: "AIzaSyB3BqY6X1mxOprZPSTwZuwjkXtZBgcOtFs",
      authDomain: "homework-7-6bfb8.firebaseapp.com",
      databaseURL: "https://homework-7-6bfb8.firebaseio.com",
      projectId: "homework-7-6bfb8",
      storageBucket: "",
      messagingSenderId: "344706120446"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();

  // Gather input from submitted form
  $("#add-train-btn").on("click", function () {
    // Prevent page refresh on click
    event.preventDefault();

    // Store input data, 
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStartTime = moment($("#start-time-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
    var trainFrequency = $("#frequency-input").val().trim();

    // Create a local object for holding the data
    var newTrain = {
      train: trainName,
      destination: trainDestination,
      start: trainStartTime,
      frequency: trainFrequency
    };

    // Console Log for testing
    // console.log(newTrain.train);
    // console.log(newTrain.destination);
    // console.log(newTrain.start);
    // console.log(newTrain.frequency);

    // Pushes captured data to database
    database.ref().push(newTrain);

    // Clear forms on submission
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-time-input").val("");
    $("#frequency-input").val("");
  });

  // When an item is added to or retrieved from the database, 
  // do this function and pass a snapshot of the child's data
  database.ref().on("child_added", function (childSnapshot) {
    // console.log(childSnapshot.val());

    // Create snapshots
    var trainName = childSnapshot.val().train;
    var trainDestination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var trainTime = childSnapshot.val().start;


    // Variables and functions for resolving a train's next arrival and minutes away
    var remainder = moment().diff(moment.unix(trainTime), "minutes") % frequency;
    var minutesAway = frequency - remainder;

    var nextArrival = moment().add(minutesAway, "m").format("hh:mm A");

    // Append new cells in new html row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(frequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway)
    );
    
    // Display it in the tbody
    $("#train-table > tbody").append(newRow);
  });
});