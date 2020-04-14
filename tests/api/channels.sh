echo Создаем 3 канала
curl -X POST -H "Content-Type: application/json" -d '{"name": "Канал 1"}' 'http://localhost:30001/api/channels/'
echo
curl -X POST -H "Content-Type: application/json" -d '{"name": "Канал 2", "parent_id": 1}' 'http://localhost:30001/api/channels/'
echo
curl -X POST -H "Content-Type: application/json" -d '{"name": "Канал 3", "parent_id": 1}' 'http://localhost:30001/api/channels/'
echo

echo Запрашиваем все каналы
curl 'http://localhost:30001/api/channels/'
echo

echo Запрашиваем канал с id=1
curl 'http://localhost:30001/api/channels/1'
echo
