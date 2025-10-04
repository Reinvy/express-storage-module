const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const { pathToUrl } = require('../utils/pathUtils');

const prisma = new PrismaClient();

module.exports = async (userId, file) => {
    try {
        const createdFile = await prisma.file.create({
            data: {
                name: file.originalname,
                path: file.path,
                size: file.size,
                mimeType: file.mimetype,
                userId: userId,
            }
        });
        
        // Transform path to web-accessible URL
        createdFile.path = pathToUrl(createdFile.path);
        
        return createdFile;
    } catch (error) {
        await fs.promises.unlink(file.path);
        throw error;
    }
}

