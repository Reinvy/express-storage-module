const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

module.exports = async (fileId) => {
    try {
        const file = await prisma.file.findUnique({
            where: { id: fileId }
        });
        
        if (!file) {
            throw new Error('File not found');
        }
        
        await prisma.file.delete({
            where: { id: fileId }
        });
        await fs.promises.unlink(file.path);

    } catch (error) {
        console.error(error);
        if (error.code === 'ENOENT') {
            return;
        }
        throw error;
    }
};
