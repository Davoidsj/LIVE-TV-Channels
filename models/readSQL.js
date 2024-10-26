const fs = require('fs');
const path = require('path');

exports.readSQLFile = file => {
    const filePath = path.join(__dirname, file);
    try {
        // Read the full content of the .sql file
        const sqlFileContent = fs.readFileSync(filePath, 'utf8');
        return sqlFileContent;
    } catch (error) {
        console.error('Error reading the SQL file:', error);
        throw error;
    }
};



