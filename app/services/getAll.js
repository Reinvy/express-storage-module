const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async () => {
    try {
        const files = await prisma.file.findMany();
        return files;
    } catch (error) {
        console.error(error);
        throw error;
    }
};