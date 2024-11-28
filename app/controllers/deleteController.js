const service = require('../services');

module.exports = async (req, res, next) => {
    const fileId = req.params.id;
    try {
        await service.deleteS(fileId);
        return res.status(200).json({
            success: true,
            message: 'File deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
