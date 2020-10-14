## Dependencies
---
- react-router-dom
- react-transition-group


### Handling CORS

**Process**
- created an express proxy server to handle GET requests; listening on port 4000
- in the frontend `package.json` set a attribute called 'proxy' to "http://localhost:4000" --> ` "proxy" : "http://localhost:4000"`. This allows webpack to accept request to this port without any CORS errors, since you are declaring an external resource.
- in frontend code, made GET request using `axios`