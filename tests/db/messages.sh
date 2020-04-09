# Создаем канал
curl -X POST -H "Content-Type: application/json" -d '{"user_id": 123, "_text": "hello"}' 'http://localhost:30001/api/channels/1/messages'

# Запрашиваем канал
curl 'http://localhost:30001/api/channels/1/messages'
