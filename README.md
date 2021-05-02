# distress-bot
Distress Bot for Sahaya group

# Build steps

## Environment Variables
1.  Copy the environment template file
    ```bash
    cp app-server/.env.server.template app-server/.env.server
    ``` 
2.  Set at least the following mandatory environment variables:
    - TELEGRAM_BOT_USERNAME
    - TELEGRAM_BOT_TOKEN
    - TELEGRAM_BOT_SECRET

### Description of environment variables
    - TELEGRAM_BOT_USERNAME - username of the bot created with Telegram @BotFather;eg: if the bot's username is @mynewbot, please set this to `mynewbot`
    - TELEGRAM_BOT_TOKEN - the bot token of the above bot; you will get this from @BotFather
    - TELEGRAM_BOT_SECRET - any string; will be added to the webhook url to prevent unauthorized access, so pick something url safe and hard to guess
    - NGROK_AUTH_TOKEN [Optional] - authentication token for your ngrok account; useful if you want your ngrok sessions to not time out; sign up on https://ngrok.com to get one
    - NGROK_REGION [Optional] - the 2-character ngrok region code; eg: us, eu, in, etc.
    - HOST [Optional] - in production, the domain name and path to the server

## Build Option 1 - Docker (recommended)

1.  ### Install Docker
    Install docker and docker-compose (see instructions on https://www.docker.com/)

2.  ### Build and run
    ```bash
    docker-compose up
    ```

## Build Option 2 - Node

1.  ### Install Node
    Install npm and node (see instructions on https://nodejs.org/en/download/)

2.  ### Build and run
    ```bash
    cd app-server
    npm i
    npm run start
    ```
