# App description
This is a react/node.js web app that lets users join chatrooms and comunicate with eachother.

backend repo: https://github.com/Eryk2103/chat-app-server
# Tech-stack

### Tech stack
- react
- node.js
- express.js
- mongodb 
- jwt (handling user authentication)
- socket.io (websocket connections)
- mongoose (ODM for mongodb)

# App functionality


## Register page

 To register user must enter unique username and password thats atleast 4 charecters long. After successful register user gets redirected to login page.
 
 
![image](https://user-images.githubusercontent.com/75088475/196391106-a0b30461-3c34-4c50-b264-1107c1c0ab15.png)

## Login page

To login user must enter valid username and password. If credentials are invalid, error message is displayed.


![image](https://user-images.githubusercontent.com/75088475/196391828-b05a6b8d-9203-4163-9c16-ff7b240903ec.png)

## Main page

### Selecting chatroom to join

User can join specific chatroom by clicking on its name displayed in a list. Search bar lets users quickly find specific chatroom they are looking for.  


![image](https://user-images.githubusercontent.com/75088475/196393805-48961af3-efe5-4407-a90b-a9eb7ae53333.png)


![image](https://user-images.githubusercontent.com/75088475/196393882-fc518b33-43d8-49c7-a078-40aa0837a909.png)


### Create new chatroom

After clicking the create button a modal window is displayed, where user can enter the chatrooms name. If the entered text is unique chatroom is created. Otherwise an error message is displayed. 


![image](https://user-images.githubusercontent.com/75088475/196395704-613e09eb-6718-483b-9940-34197b13e145.png)


### Sending and displaying messages

User can send any message by typing it into the input and pressing enter or send button. Messages are emitted using websockets, so users in the same room recieve messages in the same time.


![image](https://user-images.githubusercontent.com/75088475/196399567-cacb8e48-70d3-46fb-980a-64d98f81254c.png)



