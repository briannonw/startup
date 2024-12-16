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
#### Longer Explanation
1. What is the default port for HTTP/HTTPS/SSH?
* HTTP (Port 80): This is the default port used by the HTTP protocol to transfer unencrypted web data between clients and servers.
* HTTPS (Port 443): HTTPS is the secure version of HTTP, using encryption (SSL/TLS) to protect data during transfer. It uses port 443 by default.
* SSH (Port 22): SSH is a protocol for securely accessing remote machines. It provides encrypted communication and uses port 22 by default.
2. What does an HTTP status code in the range of 300/400/500 indicate?
* 300 Range (Redirection): These codes indicate that further action is needed to complete the request. For example:
    * 301: Permanent redirect (use this when a resource has permanently moved).
    * 302: Temporary redirect (use when a resource has temporarily moved).
* 400 Range (Client Errors): These codes indicate errors on the client’s side. For example:
    * 400: Bad Request, meaning the server cannot process the request due to invalid syntax.
    * 404: Not Found, meaning the server cannot find the requested resource.
* 500 Range (Server Errors): These codes indicate errors on the server’s side. For example:
    * 500: Internal Server Error, a general server issue.
    * 502: Bad Gateway, indicating the server received an invalid response from an upstream server.
3. What does the HTTP header content-type allow you to do?
* HTTP Content-Type Header: The Content-Type header tells the server or client how to interpret the data being sent or received. For example:
    * text/html: The content is an HTML document.
    * application/json: The content is a JSON object.
    * image/png: The content is a PNG image. By setting this header, you inform the server or browser of the type of data, so it can handle it appropriately.
4. What does a “Secure cookie”/”Http-only cookie”/”Same-site cookie” do? https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
* Secure Cookie: A cookie that can only be sent over HTTPS connections, ensuring that it is protected from eavesdropping on insecure networks.
* Http-Only Cookie: A cookie that cannot be accessed through JavaScript on the client side. This protects it from being accessed by malicious scripts, thus defending against XSS attacks.
* Same-Site Cookie: This restricts how cookies are sent with cross-origin requests. It helps prevent CSRF (Cross-Site Request Forgery) attacks by ensuring cookies are only sent in first-party contexts (Same-Site Strict), or during top-level navigations (Same-Site Lax).
5. Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /api/document?
* Express Middleware Console Output: Assuming the Express middleware is logging something like console.log(req.url) in response to a GET request to /api/document, the output would be something like: (bash)
* /api/document
* If additional logging is involved, it would show whatever data you log, such as headers, query parameters, or request method.
6. Given the following Express service code: What does the following front end JavaScript that performs a fetch return?
* Express Service Code and Fetch Request: In the context of an Express backend, if you make a fetch request to the server, it will return a Promise that resolves to the Response object. For example: (javascript)
* fetch('/api/document')
*   .then(response => response.json())  // If the response is JSON
*   .then(data => console.log(data));    // Logs the parsed JSON data
* If the backend responds with JSON data, the frontend would log it.
7. Given the following MongoDB query, select all of the matching documents {name:Mark}
* MongoDB Query ({name: "Mark"}): This MongoDB query will retrieve all documents in the database where the name field is equal to "Mark". It’s a simple query that matches exact values.
8. How should user passwords be stored?
* Storing User Passwords: Passwords should never be stored in plain text. Always hash the password using a strong hashing algorithm like bcrypt, Argon2, or PBKDF2. Hashing transforms the password into a fixed-length string, which cannot be easily reversed. Additionally, adding a salt to the hash helps prevent rainbow table attacks.
9. Assuming the following node.js websocket code in the back end, and the following front end websocket code, what will the front end log to the console?
* WebSocket Code Frontend Logging: In WebSocket communication, messages sent from the server are received in the client’s event listener. For example: (javascript)
* ws.onmessage = (event) => {
*   console.log('Message from server: ', event.data);
* };
* If the server sends a message like "Hello, client!", the frontend will log: (csharp)
* Message from server: Hello, client!
10. What is the websocket protocol intended to provide?
* WebSocket Protocol: WebSocket provides a protocol for full-duplex communication over a single, long-lived TCP connection. Unlike HTTP, which is request-response-based, WebSocket allows continuous, bidirectional communication between client and server. This makes it ideal for real-time applications like chat apps, online games, or live updates.
11. What do the following acronyms stand for? JSX, JS, AWS, NPM, NVM
* JS: JavaScript, a programming language used for both client- and server-side development.
* JSX: JavaScript XML, a syntax extension for JavaScript used in React, which allows writing HTML-like elements within JavaScript code.
* AWS: Amazon Web Services, a comprehensive cloud computing platform providing a variety of services like computing, storage, and databases.
* NPM: Node Package Manager, a package manager for JavaScript that allows you to manage dependencies and scripts for your Node.js projects.
* NVM: Node Version Manager, a tool for managing multiple versions of Node.js on the same machine, making it easier to switch between versions.
12. Assuming an HTML document with a body element. What text content will the following React component generate?  The react component will use parameters.
* React Component with Parameters: A React component that accepts parameters (called props) will render content based on those values. For example, a component that accepts a name parameter might render: (jsx)
* <h1>Hello, {props.name}!</h1>
* If the name prop is "Mark", the rendered output would be: (html)
* <h1>Hello, Mark!</h1>
13. Given a set of React components that include each other, what will be generated?
* React Components Including Each Other: React components can be nested. A parent component might include a child component, which may have its own children. React will recursively render the components and generate a hierarchical structure of DOM elements. For example: (jsx)
* function Parent() {
*   return <div><Child /></div>;
* }
* 
* function Child() {
*   return <span>I'm the child!</span>;
* }
* The rendered output would be: (html)
* <div><span>I'm the child!</span></div>
14. What does a React component with React.useState do?
* React Component with useState: The useState hook allows functional components to have state. When you call useState, you get an array with two elements:
    * The current state value.
    * A function to update that state. Example: (jsx)
* const [count, setCount] = useState(0);  // `count` is the state, `setCount` updates it
15. What are React Hooks used for?
* React Hooks: React Hooks are functions that let you "hook into" React features such as state and lifecycle methods in functional components. They are the foundation of modern React and allow for more modular and reusable code.
16. What does the State Hook/Context Hook/Ref Hook/Effect Hook/Performance Hook do? https://react.dev/reference/react/hooks
* State Hook (useState): Manages local state in a functional component.
* Context Hook (useContext): Allows you to access the value of a React context from any component in the tree.
* Ref Hook (useRef): Provides a way to access and modify DOM elements or persist values across renders.
* Effect Hook (useEffect): Runs side effects (like data fetching, subscriptions, etc.) in functional components, akin to componentDidMount and componentDidUpdate in class components.
* Performance Hook: Hooks like useMemo and useCallback help optimize performance by memoizing values and functions.
17. Given React Router code, select statements that are true.
* React Router Code: React Router allows for navigation between different components in a React app. The Route component maps a URL to a component. For example: (jsx)
* <Route path="/home" component={Home} />
* If the current URL matches /home, the Home component will be rendered.
18. What does the package.json file do?
* package.json File: package.json is the heart of a Node.js project. It defines the project’s metadata, dependencies, and scripts. It is used by npm to install and manage dependencies and run scripts (like npm start).
19. What does the fetch function do?
* fetch Function: The fetch function is used for making HTTP requests. It returns a Promise that resolves to the Response object. It’s commonly used for making API calls: (javascript)
* fetch('/api/data').then(response => response.json());
20. What does node.js do?
* node.js: Node.js is a runtime environment for running JavaScript outside of a browser. It uses the V8 engine and is ideal for building scalable network applications, especially for real-time applications (e.g., chat apps).
21. What does pm2 do?
* pm2: PM2 is a process manager for Node.js applications. It keeps applications running, even after crashes, and can be used to monitor performance, automatically restart apps, and scale applications across multiple servers.
22. What does Vite do?
* Vite: Vite is a build tool designed for modern web development. It focuses on providing fast development experiences and optimized builds. It includes features like hot module replacement (HMR) and works well with frameworks like React, Vue, and Svelte.
#### Return to [notes.md](notes.md) or [README.md](README.md)
