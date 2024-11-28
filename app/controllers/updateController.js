const service = require('../services');

module.exports = async (req, res, next) => {
    try {
        await service.updateS(req.body.userId, req.params.id, req.file);
        return res.status(200).json({
            success: true,
            message: 'File updated successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
