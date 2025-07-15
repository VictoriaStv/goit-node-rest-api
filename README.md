# GOIT-NODE-REST-API-3

Простий REST API для роботи з контактами та верифікації email.

## Старт

1. Клонувати репозиторій:

   ```bash
   git clone <your-repo-url>
   cd GOIT-NODE-REST-API-3
   ```
2. Встановити залежності:

   ```bash
   npm install
   ```
3. Створити файл `.env` у корені з такими змінними:

   ```env
   DATABASE_URL=postgresql://...
   PORT=3000
   JWT_SECRET=your_jwt_secret
   BASE_URL=http://localhost:3000
   SMTP_HOST=smtp.ukr.net
   SMTP_PORT=465
   SMTP_USER=you@ukr.net
   SMTP_PASS=your_smtp_password
   ```
4. Запустити сервер:

   ```bash
   npm start
   ```

## Опис API

* **Реєстрація**

  * `POST /api/auth/register`
  * Body: `{ "email": "...", "password": "..." }`
  * Відправляє лист з посиланням для верифікації.

* **Верифікація**

  * `GET /api/auth/verify/:verificationToken`
  * Перший запит — повертає 200, `Verification successful`.
  * Повторний запит — 404, `User not found`.

* **Повторна відправка листа**

  * `POST /api/auth/verify`
  * Body: `{ "email": "..." }`
  * Якщо не верифікований — 200, `Verification email sent`.
  * Якщо вже верифікований — 400, `Verification has already been passed`.

* **Логін**

  * `POST /api/auth/login`
  * Body: `{ "email": "...", "password": "..." }`
  * Повертає токен лише після верифікації.

* **Поточний користувач**

  * `GET /api/auth/current`
  * Потрібен заголовок `Authorization: Bearer <token>`.

* **Logout**

  * `POST /api/auth/logout`
  * Повертає 204.

* **Аватар**

  * `PATCH /api/auth/avatars`
  * Потрібен файл `avatar` та токен.

* **Контакти**

  * `GET /api/contacts`
  * `GET /api/contacts/:id`
  * `POST /api/contacts` (JSON з полями `name`, `email`, `phone`)
  * `PUT /api/contacts/:id` (оновлення полів)
  * `PATCH /api/contacts/:id/favorite` (JSON `{ "favorite": true|false }`)
  * `DELETE /api/contacts/:id`

## Примітка

* Потрібна версія Node LTS.
* Моделі синхронізуються при запуску (`sequelize.sync({ alter: true })`).

