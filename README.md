# Personailty Quiz Website
Do you ever wonder what your choices say about you? This personality quiz website helps you explore how seemingly random decisions and personality traits affect and reveal deeper aspects of your personality. Each answer you give shapes your results, offering insights into who you are. Are you ready to find out what your choices say about you?
### Key Features
* Secure login over HTTPS
* Choice between two personality quizzes
* Multiple-choice quiz questions
* Instant results
* User account that shows past results
* Mobile-friendly design
* Like/dislike buttons for each quiz
### Class Technologies
* HTML - Used to strcture and organize webpages. Five HTML pages for: login, account, main, quiz 1, and quiz 2.
* CSS - Used to style the website so that it looks good on any device. Pages will have a similar theme.
* JavaScript/React - Used for login, like/dislike button, updates and keeps track of user's selections in quizzes, calculates results, and uses React for components and routing.
* Web Service - Used for login from 3rd party websites.
* Authentication - Used for user to create account and login.
* Database data - Used to stores users and past results from quizzes for each user.
* WebSocket data - Used to update like/dislike count in realtime to all users
### Design Images

## Notes
#### Homework
* [HTML Homework Notes](HTML_Homework_Notes.md)
* [CSS Homework Notes](CSS_Homework_Notes.md)
* [React Homework Notes](React_Homework_Notes.md)
* [Service Homework Notes](Service_Homework_Notes.md)
* [Database/Login Homework Notes](Database/Login_Homework_Notes.md)
* [WebSocket Homework Notes](WebSocket_Homework_Notes.md)
#### Class
* [Class Notes](Class_Notes.md)
#### Startup
##### HTML
I built the basic structure of my application using HTML.
- [x] HTML pages - Five HTML pages representing login, home, account, quiz 1, and quiz 2.
- [x] Links - Header with links to the home and account pages. Home page with links to quiz 1 and quiz 2.
- [x] Text - Placeholder text on all pages.
- [x] Images - Placeholder img tags.
- [x] DB/Login - Input box and submit button for login. Quiz results will be saved in the database and displayed on the account page.
- [x] WebSocket - Like and dislike buttons for realtime data.
##### CSS
I properly styled the application into its final appearance.
- [x] Header, footer, main content body
- [x] Nagvigation elements
- [x] Responsive to window resizing
- [x] Application elements
- [x] Application text content
- [x] Application images
##### React
I converted my startup frontend to use React.
- [x] Bundled using Vite
- [x] Multiple react components (including login)
- [x] React router
- [x] React hooks
##### Service
I added backend endpoints that recieves quiz results and returns them to the account page.
- [x] Node.js/Express HTTP service
- [x] Static middleware for frontend
- [x] Calls to third party endpoints
- [x] Backend service endpoints
- [x] Frontend calls service endpoints
##### Database/Login
I associated quiz results with the logged in user. Quiz results and user credentials are stored in and retrieved from the database.
- [x]  MongoDB Atlas database created
- [x]  New user registration
- [x]  Existing user authentication and logout
- [x]  Use MongoDB to store user credentials and results
- [x]  Restricts functionality based on authentication
#### Midterm
* [Midterm Notes](Midterm_Notes.md)
