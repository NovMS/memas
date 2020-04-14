echo Добавляем сообщение в канал с id=1
curl -X POST -H "Content-Type: application/json" -d '{"user_id": 123, "_text": "hello"}' 'http://localhost:30001/api/channels/1/messages'
echo

echo Запрашиваем сообщения из канала с id=1
curl 'http://localhost:30001/api/channels/1/messages'
echo
