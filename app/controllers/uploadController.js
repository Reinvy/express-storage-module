const service = require('../services');

module.exports = async (req, res, next) => {
    try {
        const result = await service.upload(req);
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