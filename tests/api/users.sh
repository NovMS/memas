echo Создаем пользователя
curl -X POST -H "Content-Type: application/json" -d '{"email": "mail@mail.ru", "name": "Иван", "surname": "Иванов", "avatar_url": "https://someUrl"}' 'http://localhost:30001/api/users'
echo

echo Запрашиваем всех пользователей
curl 'http://localhost:30001/api/users/'
echo

echo Запрашиваем пользователя с id=1
curl 'http://localhost:30001/api/users/1'
echo
