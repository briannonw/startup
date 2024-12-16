# Final Notes
1. What is the default port for HTTP/HTTPS/SSH?
* HTTP: Port 80
* HTTPS: Port 443
* SSH: Port 22
2. What does an HTTP status code in the range of 300/400/500 indicate?
* 300 range: Redirection (e.g., 301 for permanent redirect, 302 for temporary redirect)
* 400 range: Client Errors (e.g., 400 for Bad Request, 404 for Not Found)
* 500 range: Server Errors (e.g., 500 for Internal Server Error, 502 for Bad Gateway)
3. What does the HTTP header content-type allow you to do?
* HTTP Content-Type Header: The Content-Type header indicates the media type of the resource or data being sent in the HTTP request or response. It helps the server/client understand how to interpret the body of the request/response (e.g., text/html, application/json, image/png).
4. What does a “Secure cookie”/”Http-only cookie”/”Same-site cookie” do? https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
* Secure Cookie: Only sent over HTTPS connections, providing extra security.
* Http-Only Cookie: Cannot be accessed via JavaScript (helps prevent cross-site scripting (XSS) attacks).
* Same-Site Cookie: Restricts how cookies are sent with cross-site requests (i.e., helps prevent cross-site request forgery (CSRF) attacks). Can be set to Strict, Lax, or None.
5. Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /api/document?
* Express Middleware Console Output: Assuming you're logging something inside an Express middleware that handles the /api/document path, you would see whatever is logged within that middleware (e.g., console.log('Request received!')).
6. Given the following Express service code: What does the following front end JavaScript that performs a fetch return?
* Express Service Code and Fetch Request: A fetch call typically returns a Promise. If the server responds with JSON data, you can access it in the .then() block as an object (e.g., response.json()).
7. Given the following MongoDB query, select all of the matching documents {name:Mark}
* MongoDB Query ({name: "Mark"}): The query would return all documents in the collection where the name field is equal to "Mark".
8. How should user passwords be stored?
* Storing User Passwords: User passwords should be stored in a hashed form, not as plain text. A hashing algorithm such as bcrypt or Argon2 should be used, along with a salt to prevent rainbow table attacks.
9. Assuming the following node.js websocket code in the back end, and the following front end websocket code, what will the front end log to the console?
* WebSocket Code Frontend Logging: In WebSockets, the frontend logs messages sent from the backend (e.g., console.log("Message received: ", message) if the backend sends messages). The exact output depends on the backend WebSocket message sent.
10. What is the websocket protocol intended to provide?
* WebSocket Protocol: WebSocket is designed to provide full-duplex communication channels over a single TCP connection, allowing for real-time, bidirectional communication between the client and server.
11. What do the following acronyms stand for? JSX, JS, AWS, NPM, NVM
* JS: JavaScript
* JSX: JavaScript XML (a syntax extension for JavaScript used in React)
* AWS: Amazon Web Services
* NPM: Node Package Manager
* NVM: Node Version Manager
12. Assuming an HTML document with a body element. What text content will the following React component generate?  The react component will use parameters.
* React Component with Parameters: The output of the React component will depend on the parameters passed to it. If it’s rendering text or other elements, the output will be a DOM structure based on those parameters.
13. Given a set of React components that include each other, what will be generated?
* React Components Including Each Other: When React components include each other, React will render them hierarchically. The output will be a tree of DOM elements, with each parent component containing its child components.
14. What does a React component with React.useState do?
* React Component with useState: The useState hook allows you to add state to functional components. It returns a state variable and a function to update that state.
15. What are React Hooks used for?
* React Hooks: React Hooks are functions that allow you to use state and other React features in functional components (e.g., useState, useEffect, useContext).
16. What does the State Hook/Context Hook/Ref Hook/Effect Hook/Performance Hook do? https://react.dev/reference/react/hooks
* State Hook: Manages local component state.
* Context Hook: Accesses React context values.
* Ref Hook: Accesses and manipulates DOM elements or persists values across renders.
* Effect Hook: Performs side effects in functional components (e.g., fetching data).
* Performance Hook: Used for performance optimization, e.g., useMemo and useCallback.
17. Given React Router code, select statements that are true.
* React Router Code: React Router’s Route component maps paths to components. The selected statement would depend on the paths and components specified in your router code.
18. What does the package.json file do?
* package.json File: The package.json file is used to define metadata about the project, including dependencies, scripts, and configurations for npm.
19. What does the fetch function do?
* fetch Function: The fetch function is used to make HTTP requests in JavaScript. It returns a Promise that resolves to the Response object representing the response to the request.
20. What does node.js do?
* node.js: Node.js is a JavaScript runtime built on Chrome’s V8 engine. It allows you to run JavaScript on the server-side.
21. What does pm2 do?
* pm2: PM2 is a process manager for Node.js applications, providing features like process monitoring, automatic restarts, and load balancing.
22. What does Vite do?
* Vite: Vite is a modern build tool for JavaScript and TypeScript projects, offering fast development and optimized production builds with support for hot module replacement (HMR).
#### Return to [notes.md](notes.md) or [README.md](README.md)
