echo Запрашиваем все каналы, в которых состоит пользователь с id=1
curl 'http://localhost:30001/badapi/users/1/channels'
echo
echo Запрашиваем все сообщения из канала с id=1
curl 'http://localhost:30001/badapi/channels/1/messages'
echo
