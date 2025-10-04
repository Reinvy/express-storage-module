const updateService = require('../services/update');

module.exports = async (req, res, next) => {
    try {
        await updateService(req.body.userId, req.params.id, req.file);
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
