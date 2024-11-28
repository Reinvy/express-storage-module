const uploadService = require('../services/upload');

module.exports = async (req, res,) => {
    try {
        await uploadService(req.body.userId, req.file);
        return res.status(200).json({
            success: true,
            message: 'File uploaded successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error uploading file',
        });
    }
}