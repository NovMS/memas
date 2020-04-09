# Создаем канал
curl -X POST -H "Content-Type: application/json" -d '{"name": "Канал"}' 'http://localhost:30001/api/channels/'

# Запрашиваем все каналы
curl 'http://localhost:30001/api/channels/'
