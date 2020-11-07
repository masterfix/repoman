FROM archlinux

RUN pacman --noconfirm -Suy && pacman --noconfirm -S nodejs npm

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

WORKDIR /app/dist

EXPOSE 3000

CMD ["node", "main.js"]