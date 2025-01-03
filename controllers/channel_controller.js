const { v4: uuidv4 } = require('uuid');
const pool = require('../models/db');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { readSQLFile } = require('../models/readSQL');

exports.getChannels = async(req,res)=>{


    try{
     
        const result = await pool.query(readSQLFile('../sql/getchannels.sql'));
        res.status(200).json(result.rows);

    }
    catch(error){ 
        res.json({error : error.message});
    }

};


exports.getCategories = async(req,res)=>{


    try{
     
        const result = await pool.query(readSQLFile('../sql/categoryFind.sql'));
        res.status(200).json(result.rows);

    }
    catch(error){ 
        res.json({error : error.message});
    }

};

exports.getAllCategories = async(req,res)=>{


    try{
     
        const result = await pool.query(readSQLFile('../sql/getAllCategories.sql'));
        res.status(200).json(result.rows);

    }
    catch(error){ 
        res.json({error : error.message});
    }

};


exports.getChannel = async(req,res)=>{


    try{
        const {id} = req.params;

        const book = await pool.query(readSQLFile('../sql/getchannel.sql'),[id]);

    
        res.status(200).json({message :  `specific channel is returned: ` ,data: book.rows});

    }
    catch(error){
        res.json({error : error.message});
    }

}; 
exports.playChannel = async(req,res)=>{


    try{
        const {id} = req.params;

        const response = await axios.get('http://localhost:3001/channelList');
        const channel = response.data.find(item => item.id == id);
        res.render('player/ChannelPlayer',{pageTitle : 'Play a channel',currentRoute: req.path,cl : channel});

    }
    catch(error){
        res.json({error : error.message});
    }

};


exports.getChannelId = async (req, res) => {
    const { cName } = req.body;

    try {
        const query = readSQLFile('../sql/channelSearchByName.sql');
        const values = [cName];

        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            res.json({ id: result.rows[0].id });
        } else {
            res.json({ id: null });
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
};

exports.editChannel = async(req,res)=>{


    try{
        const {id} = req.params;

        const response = await axios.get('http://localhost:3001/channelList');
        const cl = response.data.find(item => item.id == id);
        res.render('edit/ChannelEdit',{pageTitle : 'Edit a channel',currentRoute: req.path,channel : cl});

    }
    catch(error){
        res.json({error : error.message});
    }

};




exports.updateChannelInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { cName, description, liveURL,imgURL, fbURL, twURL, youtubeURL, website, category } = req.body;
   
        
        // Update the channel information in the database
        const updatedChannel = await pool.query(
            readSQLFile('../sql/channel_update.sql'),
            [cName, description, liveURL, imgURL, fbURL, twURL, youtubeURL, website, category, id]
        );

        // If the update was successful, return the updated data
        if (updatedChannel.rows.length > 0) {
            res.status(200).json({ message: `Channel information updated successfully`, data: updatedChannel.rows[0] });
        } else {
            res.status(404).json({ message: `Channel with ID ${id} not found` });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.defaultURL = async (req, res) => {
    try {
        const re = await axios.get('http://localhost:3001/getAllCategories');
        const categories = re.data.map(item => item.category);
        const resp = await axios.get('http://localhost:3001/channelList');
        res.render('index',{pageTitle : 'LIVE TV ',currentRoute: req.path, channels : resp.data, category : categories});
    } catch (error) {
        res.json({ error: error.message });
    }
};


exports.categoryNavigate = async (req, res) => {
    try {
        const { category } = req.params;
        const response = await axios.get('http://localhost:3001/categoryFind');
        const categories = response.data.filter(item => item.category == category);
        res.render('specificCategory/CategoryFind',{pageTitle : `Channel Category
            | ${category}`,currentRoute: req.path,category : categories});
    } catch (error) {
        res.json({ error: error.message });
    }
};

exports.deleteChannel = async (req, res) => {
    try {
        const { id } = req.params;

        const delChannel = await pool.query(readSQLFile('../sql/deletechannel.sql'), [id]);

        // Check if any row was deleted
        if (delChannel.rowCount === 0) {
            return res.status(404).json({ message: `Channel with id ${id} not found.` });
        }

        res.status(200).send({message : 'Successfully deleted channel'});
   
    } catch (error) {
   
        res.status(500).json({ error: error.message });
    }
};


exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const delChannel = await pool.query(readSQLFile('../sql/deleteCategory.sql'), [id]);

        // Check if any row was deleted
        if (delChannel.rowCount === 0) {
            return res.status(404).json({ message: `Category with id ${id} not found.` });
        }

        res.status(200).send({message : 'Successfully deleted category.'});
   
    } catch (error) {
   
        res.status(500).json({ error: error.message });
    }
};




exports.uploadChannelData = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Destructuring the required fields from the form body
        const { cName, desc, url, facebook, twitter, youtube, website, dropdown_menu } = req.body;

        // Ensure that dropdown_menu (category) has been selected
        if (!dropdown_menu) {
            return res.status(400).json({ error: 'Category is required' });
        }

        const id = uuidv4(); // Generate a unique ID for the new channel

        // Upload the image to imgbb
        const form = new FormData();
        form.append('image', fs.createReadStream(req.file.path));

        const response = await axios.post('https://api.imgbb.com/1/upload', form, {
            headers: {
                ...form.getHeaders(),
            },
            params: {
                key: `${process.env.IBB_KEY}`,
            },
        });

        const imgURL = response.data.data.url; // Extract the uploaded image URL

        // Insert the new channel data into the database
        const newChannel = await pool.query(
            readSQLFile('../sql/createchannel.sql'),
            [id, cName, desc, url, imgURL, facebook, twitter, youtube, website, dropdown_menu]
        );

        // Return the created channel data
        res.status(201).json({ message: `New channel created:`, data: newChannel.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.displayAllChannels = async (req, res) => {


    try{
        const response = await axios.get('http://localhost:3001/channelList');
    res.render('channels/Channels',{pageTitle : 'LIVE TV CHANNELS',currentRoute: req.path, channels : response.data});
    }
    catch(error){
        res.json({error : error.message});
    }

};

exports.createNewChannel = async (req, res) => {


    try{
        
        const response = await axios.get('http://localhost:3001/getAllCategories');
    res.render('addNewChannel/NewChannel',{pageTitle : 'Create a channel',currentRoute: req.path, categories : response.data});
    }
    catch(error){
        res.json({error : error.message});
    }

};
exports.displayAllCategories = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3001/getAllCategories');

        // Pass the transformed array to the view
        res.render('categories/Categories', {
            pageTitle: 'All Categories',
            currentRoute: req.path,
            categories: response.data
        });
    } catch (error) {
        res.json({ error: error.message });
    }
};


exports.createNewCategory = async (req, res) => {


    try{
       
    res.render('newCategory/createCategory',{pageTitle : 'Create a new Category',currentRoute: req.path});
    }
    catch(error){
        res.json({error : error.message});
    }

};


exports.categoryDataSend = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Destructuring the required field from the form body
        const { category } = req.body;

     

        const id = uuidv4(); // Generate a unique ID for the new channel

        // Upload the image to imgbb
        const form = new FormData();
        form.append('image', fs.createReadStream(req.file.path));

        const response = await axios.post('https://api.imgbb.com/1/upload', form, {
            headers: {
                ...form.getHeaders(),
            },
            params: {
                key: `${process.env.IBB_KEY}`,
            },
        });

        const imgURL = response.data.data.url; 

        // Insert the new category data into the database
        const newCategory = await pool.query(
            readSQLFile('../sql/category.sql'),
            [id, category, imgURL]
        );

        // Return the created category data
        res.status(201).json({ message: `New category created:`, data: newCategory.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.editCategory = async(req,res)=>{


    try{
        const {id} = req.params;

        const response = await axios.get('http://localhost:3001/getAllCategories');
        const cg = response.data.find(item => item.id == id);

        res.render('edit/CategoryEdit',{pageTitle : 'Edit a category',currentRoute: req.path,ct : cg,routeId : id});

    }
    catch(error){
        res.json({error : error.message});
    }

};

exports.updateCategoryInfo = async (req, res) => {
    try {
        const { category, cgURL } = req.body;
        const { id } = req.params;

        // Update the category in the database
        const updatedCategory = await pool.query(
            readSQLFile('../sql/categoryUpdate.sql'),
            [category, cgURL, id]
        );

        // Check if the update was successful
        if (updatedCategory.rowCount > 0) {
            res.status(200).json({ message: 'Category updated successfully!', data: updatedCategory.rows[0] });
        } else {
            res.status(404).json({ message: `Category with ID ${id} not found.` });
        }

    } catch (error) {
        console.error("Update error:", error); // Log the error for debugging
        res.status(500).json({ error: error.message || 'An error occurred while updating the category.' });
    }
};
