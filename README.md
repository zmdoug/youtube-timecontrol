# Servidor
- `cd backend`
- `npm install`
- `docker-compose up -d` - Para utilizar MongoDB via docker
- `criar arquivo .env no modelo do env_sample`
- `adicionar chave API do Youtube em YOUTUBE_API_KEY no .env` 
- `npm run start` - Para inciar o servidor 

 # Web
 - `cd frontend`
 - `npm install`
 - `npm start`
 ### Acessar http://localhost:4200/ no navegador.
 - A aplicação está apontada para a porta 3000, portanto caso o servidor
 - esteja rodando em outra porta alterar a configuração no arquivo
 - frontend/src/app/app.settings.ts
