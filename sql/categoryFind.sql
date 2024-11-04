
SELECT ctb.id,
ctb.cName,
ctb.imgURL,
cdb.category,
cdb.cgURL

FROM ChannelTb as ctb JOIN categoryDB as cdb

ON ctb.category = cdb.category;