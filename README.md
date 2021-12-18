Installation

App uses MongoDB as database. 
"npm install" installs both client and server dependencies
"npm run dev" starts both client and server in development mode


Dependencies:
Frontend: react, react-router-dom, js-cookie
Backend: express, dotenv, mongoose, express-validator, jsonwebtoken, uuid, bcrypt
App uses concurrently to run both front- and backend at same time in develpoment mode.


The web application uses Express-js in backend and React in frontend.
MongoDB is used as database with mongoose.
Backend uses uuidv4 to give posts and comments IDs in order to handle them and
to find correct comments for each post and correct posts.
Passwords are salted and hashed with bcrypt.

Backend calls
POST "/users/register" is used to register a new user.

POST "/users/login" is used to login

GET "/api/posts" is used to fetch a list of posts from database

GET "/api/post/:postId" is used to fetch a post by posts ID

GET "/api/posts/:user" is used to fetch all posts by username

GET "/api/comments/:id" is used to fetch comments by post ID

POST "/api/post" is used to post a new post to database
Takes username and content as parameters

POST "/api/comment" is used to post a new comment to database
Takes post id, username and content as parameters