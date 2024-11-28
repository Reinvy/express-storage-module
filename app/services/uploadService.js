const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();


module.exports = async (req) => {
    try {
        const result = await prisma.file.create({
            data: {
                name: req.file.originalname,
                path: req.file.path,
                size: req.file.size,
                mimeType: req.file.mimetype,
                userId: req.body.id
            }
        });

        return result
    } catch (error) {
        await fs.promises.unlink(req.file.path);
        throw error;
    }
}

