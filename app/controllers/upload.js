const uploadService = require('../services/upload');

module.exports = async (req, res,) => {
    try {
        await uploadService(req.user.id, req.file);
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