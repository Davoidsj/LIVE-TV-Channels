INSERT INTO channelTb(id, cName, description, liveURL, imgURL, fbURL, twURL, youtubeURL, website, category) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;

