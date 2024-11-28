const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();


module.exports = async (userId, file) => {
    try {
        await prisma.file.create({
            data: {  
                name: file.originalname,
                path: file.path,
                size: file.size,
                mimeType: file.mimetype,
                userId: userId,
            }
        });
    } catch (error) {
        await fs.promises.unlink(file.path);
        throw error;
    }
}

