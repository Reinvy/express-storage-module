const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

module.exports = async (userId, fileId, file) => {
    try {
        const oldFile = await prisma.file.findUnique({
            where: { id: fileId }
        });

        if (!oldFile) {
            throw new Error('File not found');
        }

        await prisma.file.update({
            where: { id: fileId },
            data: {
                name: file.originalname,
                path: file.path,
                size: file.size,
                mimeType: file.mimetype,
                userId: userId,
            }
        })

        if (oldFile.path) {
            await fs.promises.unlink(oldFile.path).catch(() => {
                console.error('Failed to delete old file');
            });    
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
