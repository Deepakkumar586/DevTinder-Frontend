# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# DevTinder

- create a vite + react project
- remove unnecessary code
- install tailwind and setup in project
- install daisy Ui and setup in project
- create navabar component with navbar.jsx and write code inside of component
- install react-router-dom
- create BrowserRouter > routes > route=/ Body > RouteChildren
- create an outlet in your body Component
- create a login component and write code
- In Backend - install cors => add middleware to with configuration: origin, credentials:true
- whenever making a api call pass axios => {withCredentials:true}
- install redux toolkit
- profile edit built with add toast
- feed api built
- make connection request component
- make all connection components

# Body

Navbar
Route/ => Feed
Route/login => Login
Route/logout => Logout
Route/connections => Connections
Route/profile => Profile

<!-- aws command -->

- signup on AWS
- Launch instance
- chmod/cmd 400 "devtinder-web.pem"
- ssh -i "devtinder-web.pem" ubuntu@ec2-51-20-82-159.eu-north-1.compute.amazonaws.com
- install node version - need install same version which u r use in code
- git clone- frontend and backend code
  -Frontend - cd project-name - npm i -> dependencies - npm run build - sudo apt update - udate the system/packages/ubuntu - sudo apt install nginx - sudo systemctl start nginx - sudo nginx -v - sudo systemctl enable nginx - now nginx is setup in our system - copy code from dist(build files) to /var/www/html - sudo scp -r dist/\* /var/www/html/ - cd /var/www/html/ - ls - here we check all files which we copied early - enable port :80 on your instance(AWS)
- Backend - npm i - allowed EC2 instance public Ip on mongoDb server - install pm2 - npm install pm2 -g - pm2 start npm -- start - and then our application online 24\*7 - pm2 list, pm2 flush <name>, pm2 stop <name>,pm2 delete <name>

      Frontend - http://51.20.82.159/
      backend  - http://51.20.82.159:8888/

- Nginx Config : 

      path config nginx -sudo nano /etc/nginx/sites-available/default

      Nginx config :
      server_name 51.20.82.159;

        location /api/ {
        proxy_pass http://localhost:8888/; # pass the request to Node.js app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
      }

      and then restart the nginx - sudo systemctl restart nginx

     -  modify the base url in frontend Projet to /api


# AWS_SES
   - create IAM user
   - Give Access to AmazonSESfullAccess
   - amazon ses create an identity
   - verify email
   - install aws sdk - v3


# Razorpay Payment Gateway Interation 
    - ref https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/#integrate-with-razorpay-payment-gateway
    - ref https://razorpay.com/docs/webhooks/validate-test/  --- for webhooks
    - ref https://razorpay.com/docs/webhooks/payloads/payments/ --- for check payment sample after successful payment or failed payment
    - sign up on Razorpay & complete
    - created a UI  for premium and silver or gold
    - creating  an API for create order in Backend
    - added my key and secret in env file
    - initialized Razorpay in utils
    - creating order on Razzorpay
    -  create schema and model
    - saved the order in pyamnets collection
    - make APi dynamic
    - setup razorpay webhook  on your Live APi

#  Real Time Chat using Websocket
   -  build the UI for Chat window on Your Route like this /chat/:targetUserId
   - setUp socket.io in Backend
   - npm i socket.io
   - in frontend install  : npm i socket.io-client
   - initialies the chat
   - create Socket Connection
   - listen to events



# TODO:   which are implemented in our website   
   - TODO : improve Ui
   - TODO : Add Featuer if I'm not friends then I should not be able to send message
   - TODO : Add Feature for blueTick
   - TODO : Add Fature for Typing- show typing To user
   - TODO : Add message Limit
   - TODO : if user have not premium then i should bot be able to send message (sender should have a premium and recevier should have a premium then we able to send message)
   - TODO : Add emoji options in chat
   - TODO : if user have a premium then premium card should not be show ( show another message)



    
