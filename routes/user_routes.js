const express = require('express');
const {  defaultURL, displayAllChannels, createNewChannel, displayAllCategories, uploadChannelData, getChannels, getChannel, deleteChannel ,playChannel, editChannel,updateChannelInfo, categoryNavigate, createNewCategory, categoryDataSend, getCategories, getAllCategories, deleteCategory, editCategory, updateCategoryInfo, getChannelId} = require('../controllers/channel_controller');
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
router.post('/getChannelId',getChannelId)
router.get('/getAllCategories',getAllCategories);
router.delete('/delete/:id',deleteChannel);
router.delete('/category/delete/:id',deleteCategory);
router.get('/channels',displayAllChannels);
router.get('/newchannel',createNewChannel);
router.get('/categories',displayAllCategories);
router.get('/categoryFind',getCategories);
router.get('/newcategory',createNewCategory);
router.post('/addNewChannel',upload.single('image'),uploadChannelData);
router.post('/addNewCategory',upload.single('image'),categoryDataSend);
router.get('/edit/:id',editChannel);
router.get('/category/edit/:id',editCategory);
router.put('/update/:id', updateChannelInfo);
router.put('/category/update/:id', updateCategoryInfo);


module.exports = router;
