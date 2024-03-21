# API_Node_Mysql

API node lista para desplegar en docker y dar seguridad al ingreso de tu proyecto.

## Step 1 ##

- cd name project
- npm install
- .env file
  - MYSQL_HOST=127.0.0.1
  - MYSQL_USER=root
  - MYSQL_PASSWORD=
  - MYSQL_ROOT_PASSWORD=
  - MYSQL_DATABASE=test_db
  - MYSQLDB_LOCAL_PORT=3306
  - MYSQLDB_DOCKER_PORT=3306
  - NODE_LOCAL_PORT=8081
  - NODE_DOCKER_PORT=8081
  - SECRET= "OK!6QoFW&L4L?Wo"

## Step 2 ##

- node server.js

### step 3 Docker ##

- Main folder cmd
- docker compose up

## API Routes ##

## TEST ##
### GET - http://127.0.0.1:8081/api/test/check

## REGISTER USER ##
### POST - http://127.0.0.1:8081/api/jwt/register
- Body{
    - "username":"test",
    - "email":"test@test.com",
    - "password":"12345678",
    - "rol":"0",
    - "avatar":"k"
  -}

## LOGIN ##
### POST - http://127.0.0.1:8081/api/jwt/signin
  - Body{
    - "username":"test",
    - "password":"12345678"
  -}
### RETURN:
  - {
    - "TOKEN":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.",
    - "id":1,
    - "username":"test",
    - "email":"test@test.com",
    - "rol":0
  -}

## USER CONTENT ##
### POST -http://127.0.0.1:8081/api/get/user
  - Headers
  - x-access-token= 'Sigin Token Return'

## ADMIN CONTENT ##
### POST - http://127.0.0.1:8081/api/get/admin
  - Headers
  - x-access-token= 'Sigin Token Return'
