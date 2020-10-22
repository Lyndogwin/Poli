## General Stack Architecture

### This application consists of 3 docker containers
- Node alpine container -- react app
- Node alpine container -- express proxy server (CORS)
- MySQL base image container -- persistent storage with the flexibility to dump data
- - This container specifically creates a dir in the local directory which is not version controlled. This will be the developers working dir for the database. The developer can run the `importdb` script from the container in the dir `/db-export`. Once this script is run the deveoper will have access to the version-controlled database. If any changes are made to the database that need to be commited, the dev must run the `dumpdb` script in the same dir in order to export the script needed to make the update. 


## Dependencies

- react-router-dom
- react-transition-group

## Caveats

### Handling CORS

**Process**
- created an express proxy server to handle GET requests; listening on port 4000
- in the frontend `package.json` set a attribute called 'proxy' to "http://localhost:4000" --> ` "proxy" : "http://localhost:4000"`. This allows webpack to accept request to this port without any CORS errors, since you are declaring an external resource.
- in frontend code, made GET request using `axios`


### Database version control

**Process**

We are currently using MySQL to handle infromation storage and queries. 