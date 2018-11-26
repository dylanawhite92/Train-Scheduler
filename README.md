# Train-Scheduler
Week 4, Homework 7


## Overview

### Built With

For this assignment I utilized HTML, CSS, JavaScript, jQuery, Bootstrap for organizing the viewport, Firebase, and Moment.js.

### Here's How the App Works

* The form at the bottom of the page allows the user to choose a train name, destination, the starting time of the train, and the frequency in minutes of the trains.

* On submit, the data is stored as an object and then pushed to Firebase as a new `childSnapshot`. 

* Each child added or retrieved from Firebase triggers the function that creates the logic for calculating the time of the next train's arrival in military time, the remainder , and how many minutes are left until the next train's arrival based on the frequency and the remainder. 

* On each submission a new row is created in the `train-table`, and the data for `trainName`, `trainDestination`, `frequency`, `nextArrival`, and `minutesAway` is then appended to the correct cell in the `train-table`.

* Even after the window has been closed, the data persists in Firebase and is displayed upon revisiting the page.