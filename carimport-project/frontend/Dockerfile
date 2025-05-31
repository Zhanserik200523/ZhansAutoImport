FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь проект
COPY . .

# Собираем проект
RUN npm run build

# Указываем порт
EXPOSE 3000

# Запускаем Next.js в продакшн-режиме
CMD ["npm", "start"]
