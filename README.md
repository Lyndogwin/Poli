## Quick Start
- Download Docker https://www.docker.com/get-started
- Restart, make sure to download linux package if installation incomplete (click the window link)
- Open a bash shell, `cd` into the repo
- `docker-compose up --build`
- open a browser, go to localhost:3000

## Command cheatsheet
- `docker-compose up` --build
- `docker-compose exec database bash` --> open shell to database
- `db-export/importdb` (while shell is open to database) --> import any changes to the database to your local build of the container's database
- `db-export/dumpdb` (while shell is open to datatbase) --> dump the current changes to the database
- `docker-compose exec <container-namespace (name of comtainer in docker-compose.yml)> sh` --> open a shell to <container-namespace>
- `npm install <dependency> --save` (while shell is open on node container i.e. `dev-env` and `proxy`) --> install a node dependency without adding extra bulk to the project dir
- **Additionally** if you try to connect to our the database via mysql desktop, the port number is 3307 instead of the standard 3306. The password for root is in the .env file.

## General Stack Architecture

### This application consists of 3 docker containers
- Node alpine container -- react app
- Node alpine container -- express proxy server (CORS)
- MySQL base image container -- persistent storage with the flexibility to dump data
- - This container specifically creates a dir in the local directory which is not version controlled. This will be the developers working dir for the database. The developer can run the `importdb` script from the container in the dir `/db-export`. Once this script is run the deveoper will have access to the version-controlled database. If any changes are made to the database that need to be commited, the dev must run the `dumpdb` script in the same dir in order to export the script needed to make the update. 


## Dependencies

- react-router-dom
- react-transition-group
- axios 
- mysql node js
- express js
- request js

## Environment variables
The environment variables for the application must be defined in a .env file at the top of the directory. 

## Caveats

### Handling CORS

**Process**
- created an express proxy server to handle GET requests; listening on port 4000
- in the frontend `package.json` set a attribute called 'proxy' to "http://localhost:4000" --> `"proxy" : "http://localhost:4000"`. This allows webpack to accept request to this port without any CORS errors, since you are declaring an external resource.
- in frontend code, made GET request using `axios`


### Database version control

**Process**

We are currently using MySQL to handle infromation storage and queries. 
