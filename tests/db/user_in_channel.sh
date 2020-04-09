# Создаем пользователя в канал
curl -X POST -H "Content-Type: application/json" -d '{}' 'http://localhost:30001/api/channels/1/users/1'

# Запрашиваем всех пользователей канала с id=1
curl 'http://localhost:30001/api/channels/1/users'

# Запрашиваем все каналы пользователя с id=1
curl 'http://localhost:30001/api/users/1/channels'
