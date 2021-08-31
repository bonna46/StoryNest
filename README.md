# MyStory
## HOW TO RUN
1. Clone this repository
2. Open terminal, go to backend folder, run ```npm install .```
3. Open terminal, go to frontend folder, run ```npm install .```
### Run Using NPM
1. In one terminal, go to backend directory and run ```node server.js``` or ```npm run server```
2. In other terminal, go to frontend directory and run ```npm start```

### Run Using Docker
1. Run ```docker-compose up --build```

## BACKEND
Technologies Used
1. ExpressJS (NodeJS web application framework)
2. Mongoose (ODM library for MongoDB and NodeJS)
## API Documentation

Resources are managed by REST API

1. User
2. Stories

### API Endpoints for User

#### 1.Register in MyStory

```
POST http://localhost:5000/api/register

{
   "username": "hasnin",
   "password": "123456" 
}
```

#### 2.Login in MyStory
```
POST http://localhost:5000/api/login

{
   "username": "hasnin",
   "password": "123456" 
}
```
API will response with a token(bearer token). Needed for Authorization.

### API Endpoints for Stories

#### 1. Retrieve one Story
```
GET http://localhost:5000/api/stories/{story_id}
```
#### 2. Retrieve all Stories
```
GET http://localhost:5000/api/stories
```
#### Authorization Needed
For following endpoints
1. Set ```Authorization``` field to ```Bearer Token``` type and
2. Fetch token from response of Login endpoint and type it in Bearer Token
#### 3. Create one Story
```
POST http://localhost:5000/api/stories
{
    "title":"Gym Class Heroes",
    "story":"Stereo Hearts"
}
```
#### 4. Update one Story
i) Update Title
```
PUT http://localhost:5000/api/stories/{story_id}
{
    "newtitle":"Gym Class Heroes"
}
```

ii) Update Story
```
PUT http://localhost:5000/api/stories/{story_id}
{
    "newstory":"Stereo Hearts"
}
```

iii) Update Title and Story
```
PUT http://localhost:5000/api/stories/{story_id}
{
    "newtitle":"Gym Class Heroes",
    "newstory":"Stereo Hearts"
}
```
#### 5. Delete one Story 
```
DELETE http://localhost:5000/api/stories/{story_id}
```

## FRONTEND
Technologies Used

1. React (Frontend JS library)

2. Bootstrap (CSS framework)
### Register page
![register image](https://github.com/bonna46/MyStory/blob/main/frontend/register.PNG)

### Login page
![login image](https://github.com/bonna46/MyStory/blob/main/frontend/login.PNG)

### See all stories
![story image](https://github.com/bonna46/MyStory/blob/main/frontend/stories.PNG)

### Update and Delete story
![update and delete image](https://github.com/bonna46/MyStory/blob/main/frontend/update.PNG)


