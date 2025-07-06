Простий REST API для роботи з контактами. Зберігає дані у хмарній базі Postgres через Sequelize.

## Кроки

1. **Гілка**

   * Від `main` створити гілку `03-postgresql`

2. **Налаштування середовища**

   * Скопіювати `.env.example` у `.env`
   * Відредагувати `.env`, вказати: `DATABASE_URL=postgresql://<user>:<pass>@<host>:<port>/<db>`

3. **Встановлення залежностей**

   ```bash
   npm install
   ```

4. **Запуск локально**

   ```bash
   npm run dev
   ```

5. **Налаштування бази**

   * Зареєструватися на Render і створити PostgresDB `db-contacts`
   * Встановити pgAdmin або DBeaver
   * Підключитися до БД та перевірити таблицю `contacts` з полями:

     * `id`, `name`, `email`, `phone`, `favorite`, `createdAt`, `updatedAt`

6. **Міграції**

   * Міграції не потрібні: таблиця створюється автоматично через `sequelize.sync()`

7. **Ендпоінти**

   * `GET /api/contacts` — список всіх контактів
   * `GET /api/contacts/:id` — контакт за ID
   * `POST /api/contacts` — створити контакт
   * `PUT /api/contacts/:id` — оновити контакт
   * `DELETE /api/contacts/:id` — видалити контакт
   * `PATCH /api/contacts/:id/favorite` — оновити поле `favorite`

## Валідація

* Дані перевіряються через Joi
* Якщо помилка в даних — повертається 400

## Обробка помилок

* Невірний шлях — 404 `{ message: "Route not found" }`
* Внутрішня помилка — 500 `{ message: "Server error" }`

