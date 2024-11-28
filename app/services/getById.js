const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (fileId) => {
    try {
        const file = await prisma.file.findUnique({
            where: { id: fileId }
        });
        return file;
    } catch (error) {
        console.error(error);
        throw error;
    }
};