### Быстрый старт
> createdb messenger-database
npm install
npm run-script init-db
npm run-script dev

### Чудо-скрипты
> **npm run-script init-db** - создать или пересоздать таблицы в базе данных
**npm run-script test-db** - делает понятно что. Перед использованием нужно очистить базу данных при помощи *init-db*

### Схема базы данных
доступна по ссылке: [**ссылка**](https://drive.google.com/file/d/15Ggvir42GD__oo09n-PDPgjKMmBzuveF/view?usp=sharing)  

Серым отмечены поля, которых пока нет. Таблицы ATTACHMENTS нет целиком.

### Поля таблиц
Поля таблиц должны с точностью до буквы совпадать с полями таблиц, указанных на схеме. Если не совпадают, сообщите Никите Лебедеву.

### API для работы с сервером

[Описаны здесь](docs/server-api.md)
