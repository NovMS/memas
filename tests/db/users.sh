# Создаем пользователя
curl -X POST -H "Content-Type: application/json" -d '{"email": "mail@mail.ru", "name": "Иван", "surname": "Иванов"}' 'http://localhost:30001/api/users'

# Запрашиваем всех пользователей
curl 'http://localhost:30001/api/users/'

# Запрашиваем пользователя с id=1
curl 'http://localhost:30001/api/users/1'
