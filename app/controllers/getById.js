const getByIdService = require('../services/getById');

module.exports = async (req, res, next) => {
    try {
        const result = await getByIdService(req.params.id);
        return res.status(200).json({
            status: 'success',
            message: 'File found successfully',
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};
