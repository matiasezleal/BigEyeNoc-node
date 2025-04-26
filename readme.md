

# dev
1. Run `npm install`
2. Clone file .env.template to .env
3. Config env vars
4. Exec comand to activated databases :
    ```
        docker compose up -d (detach)
    ```
5. The first time exec `npx prisma migrate dev`
6. Run ` npm run dev`


DESCRIPTION
config: here we have configuration of externals package and adapters
domain: main rules of the business
infrastructure: implementations (todo: check dependencies)
presentation: first layer with main services