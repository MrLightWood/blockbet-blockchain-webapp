# Initial Setup configuraiton
This project need .env file to be created in root directory in order to provide initial configuration for server and client

The structure of .env file looks following:  
- NODE_ENV=development  
- PORT=5000  
- DB_HOST= <your mysql host>  
- DB_PORT=<your mysql port>  
- DB_USER=<your mysql user>  
- DB_PASSWORD=<your mysql password>  
- DB_DATABASE=<your mysql database name>  
- JWT_SECRET=1189522a-d23e-4e33-9f28-33b721a3c832 <SECRET for JWT; USE THIS SECRET FOR DEVELOPMENT PURPOSE ONLY>  
- MNEMONIC=swap measure live scout normal own exclude asthma disease chase heavy desert fabric parade draft unable taste bargain artwork rebuild beyond rubber link speed <SECRET for WALLET; CREATE GANACHE ENVIRONMENT WITH THIS MNEMONIC;USE THIS SECRET FOR DEVELOPMENT PURPOSE ONLY>  
- SECRET=traffic volcano assist ensure expose marriage pool erode excuse ceiling right tongue <IGNORE THIS ONE>  
- CONTRACT_ADDRESS=<your deployed contract address>  
- PROJECTPATH=<project path; starting with C:>  

# Run project
Just type ``npm run dev`` to start both client and server or ``npm run client`` and ``npm run server`` seperately