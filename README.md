# Dinner Made Easy 

![Dinner Made Easy Logo PNG](https://github.com/genesisquinn/easy-dinner-fe/assets/123833736/333e7b69-ad33-4ded-9fa4-00bfca9cb599)

Backend API for Dinner Made Easy: A recipe management site designed to help make dinner easier. 

To run API run command ```npm run start```

Front-End: https://github.com/genesisquinn/easy-dinner-fe

# Technologies
- Express/Node.js
- Vite
- Database: MongoDB

## Dependencies
To install dependencies run command ```npm install```
  - "@google-cloud/storage": "^7.0.1",
  -  "bcrypt": "^5.1.0",
  -  "cors": "^2.8.5",
  -  "dotenv": "^16.3.1",
  -  "express": "^4.18.2",
  -  "express-session": "^1.17.3",
  -  "google-auth-library": "^9.0.0",
  -  "mongodb": "^5.7.0",
  -  "mongoose": "^7.4.2",
  -  "multer": "^1.4.5-lts.1",
 - "passport": "^0.6.0",
- "passport-local": "^1.0.0",
 -  "passport-local-mongoose": "^8.0.0"

# Project Files

## Src
- models
- routes
- .babelrc.js
- gcp.js
- server.js

## Models

Schema for database collections. Each collection references User. 

- Database.js
- GroceryList.js
- LikedRecipes.js
- Recipe.js
- User.js

## Routes

Endpoints for user authentification, recipe & grocery list creation, modification, viewing, storage and organization. 

- listRoutes.js
- oauth.js
- recipeRoutes.js
- request.js
- userRoutes.js
- auth.js
