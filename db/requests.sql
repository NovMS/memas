-- Запросить из канала с id = 100 сообщения, отправленные за последнюю неделю
SELECT * FROM messages 
    WHERE channel_id = 100 
          AND date_time > CURRENT_DATE - INTERVAL '1 WEEK'
;

-- Запросить из канала с id = 100 приложения ко всем сообщениям, отправленным за последнюю неделю

SELECT attachments.* FROM messages INNER JOIN attachments USING (message_id)
    WHERE channel_id = 100
          AND date_time > CURRENT_DATE - INTERVAL '1 WEEK'
;
    
