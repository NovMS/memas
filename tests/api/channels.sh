echo Создаем 3 канала
curl -X POST -H "Content-Type: application/json" -d '{"name": "Канал 1"}' 'http://localhost:30001/api/channels/'
echo
curl -X POST -H "Content-Type: application/json" -d '{"name": "Канал 2", "parent_id": 1, "_enckey_parent": {"key": "value"}}' 'http://localhost:30001/api/channels/'
echo
curl -X POST -H "Content-Type: application/json" -d '{"name": "Канал 3", "parent_id": 1}' 'http://localhost:30001/api/channels/'
echo

echo Запрашиваем все каналы
curl 'http://localhost:30001/api/channels/'
echo

echo Запрашиваем канал с id=2
curl 'http://localhost:30001/api/channels/2'
echo
