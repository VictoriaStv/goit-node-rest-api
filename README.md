
Простий REST API для роботи з контактами з аутентифікацією через JWT та збереженням у PostgreSQL через Sequelize.

## Як запустити

1. Клонувати репозиторій  
2. Встановити залежності  
   ```bash
   npm install
   ```
3. Створити файл `.env` в корені з такими змінними  
   ```
   DATABASE_URL=<ваш Postgres URL>
   JWT_SECRET=<секрет для JWT>
   PORT=3000
   ```
4. Запустити сервер у режимі розробки  
   ```bash
   npm run dev
   ```

## Ендпоінти

### Auth

- **POST** `/api/auth/register`  
  Реєстрація  
  ```json
  { "email": "user@example.com", "password": "pass123" }
  ```
  Відповідь 201:
  ```json
  { "user": { "email": "...", "subscription": "starter" } }
  ```

- **POST** `/api/auth/login`  
  Логін  
  ```json
  { "email": "user@example.com", "password": "pass123" }
  ```
  Відповідь 200:
  ```json
  { "token": "<JWT>", "user": { "email": "...", "subscription": "starter" } }
  ```

- **POST** `/api/auth/logout`  
  Логаут  
  - Вимагає заголовок `Authorization: Bearer <JWT>`  
  Відповідь 204 No Content

- **GET** `/api/auth/current`  
  Поточний користувач  
  - Вимагає заголовок `Authorization: Bearer <JWT>`  
  Відповідь 200:
  ```json
  { "email": "...", "subscription": "starter" }
  ```

### Contacts (захищені)

Усі запити з `Authorization: Bearer <JWT>`

- **GET** `/api/contacts`  
  Список контактів поточного юзера

- **GET** `/api/contacts/:id`  
  Деталі контакту

- **POST** `/api/contacts`  
  Створити контакт  
  ```json
  { "name":"Ім’я","email":"a@b.c","phone":"+380..." }
  ```
  Відповідь 201 — новий контакт

- **PUT** `/api/contacts/:id`  
  Оновити контакт (name/email/phone)

- **PATCH** `/api/contacts/:id/favorite`  
  Оновити поле `favorite`  
  ```json
  { "favorite": true }
  ```

- **DELETE** `/api/contacts/:id`  
  Видалити контакт

## Модель даних

- **User**  
  - `id`, `email`, `password`, `subscription`, `token`
- **Contact**  
  - `id`, `name`, `email`, `phone`, `favorite`, `owner`

## Помилки

- 400 Bad Request — помилка валідації
- 401 Unauthorized — неавторизований запит
- 404 Not Found — маршрут або ресурс не знайдені
- 409 Conflict — email вже використовується

