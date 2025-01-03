SELECT id FROM channelTb WHERE LOWER(REPLACE(cName, ' ', '')) = LOWER(REPLACE($1, ' ', ''))
