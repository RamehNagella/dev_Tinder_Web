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
        - Send/igonre the user card from Feed
        - Signup New user

    Remaining
        -   E2E  Testing



    #Deployment

    - Signup on AWS
    - Launch instance (One pem file will download)
    - locate the pem file and go to that location of pem file
    - chmod 400 <secret>.pem
    - logged into aws machine using the command

                ssh -i "devTinder.pem" ubuntu@ec2-13-60-170-179.eu-north-1.compute.amazonaws.com

    - you will be directed to aws machine terminal NOT your computer terminal
    - before uploading the project github repository links
    - MAKE SURE THAT NODE VERSIONS OF FRONT END AND BACK END CODE ARE SAME

    - Install the #SAMEvERSION  node in aws machine terminal (othrwise you will get errors);
     - node -v

     v18.17.1

    - THEN TAKE github repository links
    -   front-end repo link $git clone https://github.com/RamehNagella/dev_Tinder_Web.git
    -   back-end repo link $ git clone https://github.com/RamehNagella/DevTinder.git

    After uploading the frontend backend code to remote machine

    --> #FIRST DEPLOY FRONT END PROJECT  CODE
        run the project  (local computer)
        - npm run dev (to run machine ) but to run on remote create a dist folder to deploy it on remote server

        - npm run build

        FRONT-END (ubuntu@ip-172-31-38-199:~/dev_Tinder_Web$ )

            - npm install
            - npm run build
            - sudo apt update
            - sudo apt install nginx
            - sudo systemctl start nginx
            - sudo systemctl enable nginx

            copy the dist folder into ngnix server(i.e /var/www/html location)

            - cd
            - cd var/www/html
            - ls
            - cd dev_tinder_web
            - sudo scp -r dist/* /var/www/html
            - cd ~/var/www/html
            - ls
                assets  index.html  index.nginx-debian.html  vite.svg

        After this go to ec2 instance there you will see Public IPv4 address like
            - http://13.60.170.179/
            - This wont work because NGINX servers are running in port :80  so ENABLE PORT :80 in instance

            - instance ->Security -> Security Groups -> Inbound Rules (Edit inbound rules)

            Addrul  PortRanges :80  [save]

                then http://13.60.170.179/ this ip address will work

# nginx config

        server_name 13.49.244.228;

        location /api/ {
                 proxy_pass http://localhost:7777/;
                 proxy_http_version 1.1;
                 proxy_set_header Upgrade $http_upgrade;
                 proxy_set_header Connection 'upgrade';
                 proxy_set_header Host $host;
                 proxy_cache_bypass $http_upgrade;
    }
