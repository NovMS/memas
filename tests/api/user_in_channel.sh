echo Добавляем пользователя с id=1 в канал с id=1
# curl -X POST -H "Content-Type: application/json" -d '{}' 'http://localhost:30001/api/channels/1/users/1'
curl -X POST -H "Content-Type: application/json" -d '{"preferences": "{\"theme\": \"dark\"}"}' 'http://localhost:30001/api/channels/1/users/1'
echo

echo Запрашиваем всех пользователей канала с id=1
curl 'http://localhost:30001/api/channels/1/users'
echo

echo Запрашиваем все каналы пользователя с id=1
curl 'http://localhost:30001/api/users/1/channels'
echo
