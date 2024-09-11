# Online Coding Web
### Introduction
This project is the client part of a Fullstack website I created for learning JS for beginners.
The link to the server: https://github.com/Yosef-Perelman/OnlineCodingWeb-Server.
The site has basic programming exercises in JS language.
Feel free to try it here - https://onlinecodingweb.netlify.app.
The client deployed with Netlify and the server deployed with Heroku.
Database in MongoDB, where the data of the exercises is found.

Note: I initially created the server and client in the same repo, but it interferes with the deployment sites, so I split them into two.
Features

### Tech Stack
React.js
Node.js
Express.js
MongoDB
Socket.io
Monaco-Editor

### Site Flow
The home page has several links to exercises.
When a user clicks on one of them - if he is the first to enter the exercise then he is considered the teacher (mentor). It has two meanings:
A. He can't edit the code.
B. When he leaves the room all the students in the room are immediately taken to the home page.

When a user enters the room and is not the first then he is considered a student, and has the ability to edit the code.

The exercises are actually sections of code from which keywords have been deleted and the student has to complete them in order for the code to work.
When the student succeeds in the task, a notification appears and the code can no longer be changed.
