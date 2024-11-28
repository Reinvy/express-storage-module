const getAllService = require('../services/getAll');

module.exports = async (req, res, next) => {
    try {
        const files = await getAllService();
        return res.status(200).json({ 
            success: true, 
            message: 'Files found successfully',
            data: files 

        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};