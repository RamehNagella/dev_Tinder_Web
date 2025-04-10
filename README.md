# DevTinder

    - Create a vite + React application
    - Remove unnecessary code and creat a Hello World
    - Install tailwindCSS
    - Install Daisy UI
    - Add NavBar component to App.jsx
    - Create a NavBar.jxs seperate Component file
    - Install react-router-dom
    - Create BrowserRouter > Routes > Route=/ Body > RouteChildren

            Body
            NavBar
            Route=/ => Feed
            Route=/login =>Login
            Route=/connections => Connections
            Route=/profile => Profile

    - Create an Outlet (<Outlet/>) in Body.jsx
    - Create a Footer


    - Create a login page
    - Install axios
    - CORS - install cors in backend => add middleware to with configurations: origin credientials : true
    - Whenever we are making API call pass axios => {withCredientials: true}
    - Install Redux Toolkit https://redux-toolkit.js.org/tutorials/quick-start
    - Install react-redux + @reduxjs/toolkit => create a

    configureStore => Provieder => createSlice => add reducer to store

    - Add redux devtools in chrome
    - login and see if your data is coming properlu in the store
    - NavBar should update as soon as user logs in
    - Refactor out code ot add constants  file + create a components folder


    - You should not be access other routes without login
    -If token is not present, redirect user to login page
    -Logout Feature
    - Get the feed and add the feed in the store
    - built the user card on feed
    - Edit profile Feature built
    - Show Toast Message on save at profile

        - New Page - see all my connections
        - New Page - see all connection Requests
        - Feature - Accept/Reject C0nnection Request

    Remaining
        - Send/igonre the user card from Feed
        - Signup New user
        -   E2E  Testing
