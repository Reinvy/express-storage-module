const uploadService = require('../services/upload');

module.exports = async (req, res,) => {
    try {
        const uploadedFile = await uploadService(req.user.id, req.file);
        return res.status(200).json({
            success: true,
            message: 'File uploaded successfully',
            data: {
                id: uploadedFile.id,
                name: uploadedFile.name,
                path: uploadedFile.path,
                size: uploadedFile.size,
                mimeType: uploadedFile.mimeType,
                url: uploadedFile.path
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error uploading file',
        });
    }
}