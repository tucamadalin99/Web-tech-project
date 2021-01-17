# Web-tech-project
# Foodwaste App

### Description:
`` The application prevents food waste and encourages people to giveaway food that is not eaten and usually will end up in the trash can. ``

### DB Schema:
![schema](https://i.ibb.co/Fmt5DNF/updated-schema.jpg)

### RESTful API:

Short description of the API so far: 

The users can register with an encrypted password for better security. They can login in their user account or logout, add products that they want to give away and categorise them or delete them if they decide they want to keep them. They can see a list of the other users that are giving away food and they can claim an item if they want to take it. They can unclaim it if they deicide they don't want it anymore. They can't claim products that are already claimed by another user.
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

Note: A few more get routes are used in the API for login/logout redirection purposes only

``
POST: localhost:8080/api/register(Create a user account)
body: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            type: req.body.type
        }
``

``
POST: localhost:8080/api/login(Login to your account)
body: {
         "email":"req.body.email"
         "password":"req.body.password"
      }
``

``
POST: localhost:8080/api/createGroup(Create a group)
body: {
         "groupName":"req.body.groupName"
         "groupType":"req.body.groupType"
       }
``

``
POST: localhost:8080/api/addUsersToGroup (Add multiple or one user to group)
body: {
         "userId":"req.body.users"(Recieves an array of user id's)
         "groupId":"req.body.groupId"
      }
``

``
POST: localhost:8080/api/addProduct
body:      { 
            name: req.body.name,
            expireDate: req.body.expireDate,
            brand: req.body.brand,
            price: req.body.price,
            count: req.body.count,
            categoryId: req.body.categoryId
            }
 ``
 
 ``
 PUT: localhost:8080/api/claimProduct/:userId/:id (endpoint params: userId, id)(Claims product if it's available)
 ``
 
 ``
 PUT: localhost:8080/api/unclaimProduct/:userId/:id(params: userId, id)(Unclaims the previously product claimed by you)
 ``
 
 ``
 DELETE: localhost:8080/api/deleteProduct/:id (Deletes a product from your account)
 ``
 **
 
 ``
 DELETE: localhost:8080/api/logout (Logs out from the user session)
 ``
 
 
