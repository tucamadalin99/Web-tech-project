# Web-tech-project
# Foodwaste App

### Description:
`` The application prevents food waste and encourages people to giveaway food that is not eaten and usually will end up in the trash can. ``

### DB Schema:
![schema](https://imagizer.imageshack.com/v2/1375x639q90/923/3OofmY.jpg)

### RESTful API:

Short description of the API so far: 

The users can register with an encrypted password for better security. They can login in their user account or logout, add products that they want to give away and categorise them or delete them if they decide they want to keep them. They can see a list of the other users that are giving away food and they can claim an item if they want to take it. They can unclaim it if they deicide they don't want it anymore. 
The users can create a group and label it by the types of people that are in the group. After they create it, they can add people in the group.

Entry point: server.js

DB name: food_waste_db

``
GET: localhost:8080/extras/reset - Force resets the database, creates all the tables and relations between them and auto-populates the categories table. Just create the database and call this route (Route for development stage only, will be deleted in the production stage)
``

``
GET: localhost:8080/api/getAllUsers - Returns a response json with all the users registered to the app and their products.(Route protected by middleware, you need to register and login to access it)
``

``
GET: localhost:8080/api/getAllProducts - Returns a json with just all the items available to donate in the app.(Safeguarded by middleware, you have to login)
``
