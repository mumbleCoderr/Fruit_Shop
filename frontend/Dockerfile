# Używamy oficjalnego obrazu Node.js
FROM node:22-alpine

# Ustawiamy katalog roboczy w kontenerze
WORKDIR /app

# Kopiujemy pliki package.json i package-lock.json
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy resztę aplikacji
COPY . .

# Uruchamiamy serwer Vite
CMD ["npm", "run", "dev"]
