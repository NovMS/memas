## Для Макса:
**Запускаешь сервер:**
> createdb messenger-database  
npm install  
npm run-script dev  

**Заполняешь и тестируешь базу данных:**
> npm run-script init-db  
npm run-script test-api  
npm run-script test-badapi  

**Где посмотреть примеры работы API?**
* тесты в папке tests/badapi - здесь те запросы, о которых мы договорились
* тесты в папке tests/api - здесь запросы на добавление новых данных в БД

**Где посмотреть, что возвращает запрос к серверу?**
* скопируй curl в консоль


## Быстрый старт
> createdb messenger-database  
npm install  
npm run-script init-db  
npm run-script dev  

## Чудо-скрипты
> **npm run-script init-db** - создать или пересоздать таблицы в базе данных  
**npm run-script test-api** - протестировать api, добавляя в БД данные и запрашивая их из нее. Перед использованием нужно очистить базу данных при помощи *init-db*  
**npm run-script test-badapi** - протестировать badapi

## Схема базы данных
доступна по ссылке: [**ссылка**](https://drive.google.com/file/d/15Ggvir42GD__oo09n-PDPgjKMmBzuveF/view?usp=sharing)  

Серым отмечены поля, которых пока нет. Таблицы ATTACHMENTS нет целиком.

## Поля таблиц
Поля таблиц должны с точностью до буквы совпадать с полями таблиц, указанных на схеме. Если не совпадают, сообщите Никите Лебедеву.

## API для работы с сервером

[Описаны здесь](docs/server-api.md)
