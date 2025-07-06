# goit-node-rest-api

Простий REST API для роботи з контактами (зберігаються у файлі `contacts.json`).

## Запуск

1. Склонуй проєкт:

   ```bash
   ```

git clone <url>
cd goit-node-rest-api

````
2. Встанови пакети:
   ```bash
npm install
````

3. Запусти сервер:

   ```bash
   ```

npm run dev

````
   Сервер слухає на порту **3000**.

## Маршрути
- **GET** `/api/contacts` — всі контакти
- **GET** `/api/contacts/:id` — контакт за id
- **POST** `/api/contacts` — створити контакт
  ```json
  {
    "name": "Ім'я",
    "email": "email@example.com",
    "phone": "+380123456789"
  }
````

* **PUT** `/api/contacts/:id` — оновити контакт (одне або більше полів)
* **DELETE** `/api/contacts/:id` — видалити контакт

## Валідація

* Використовується Joi
* Некоректні дані — статус **400** і повідомлення з помилкою

