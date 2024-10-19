const express = require('express');
const {  defaultURL, displayAllChannels, createNewChannel, displayAllCategories, uploadChannelData, getChannels, getChannel, deleteChannel ,playChannel, editChannel,updateChannelInfo, categoryNavigate} = require('../controllers/channel_controller');
const multer = require('multer');
const path = require('path');
const router = express.Router();


const storage = multer.diskStorage({
  destination: (req,file, cb)=> {
      cb(null, path.join(__dirname, '../uploads/')); 
  },
  filename:  (req, file, cb) => {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  }
});

const upload = multer({ storage: storage });

router.get('/',defaultURL);
router.get('/channelList',getChannels);
router.get('/channel/:id',getChannel);
router.get('/channels/:category',categoryNavigate);
router.get('/play/:id',playChannel);
router.delete('/delete/:id',deleteChannel);
router.get('/channels',displayAllChannels);
router.get('/newchannel',createNewChannel);
router.get('/categories',displayAllCategories);
router.post('/addNewChannel',upload.single('image'),uploadChannelData);
router.get('/edit/:id',editChannel);
router.put('/update/:id', upload.single('image'), updateChannelInfo);





module.exports = router;
