const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { pathToUrl } = require('../utils/pathUtils');

module.exports = async (fileId) => {
    try {
        const file = await prisma.file.findUnique({
            where: { id: fileId }
        });
        
        // Transform path to web-accessible URL
        if (file) {
            file.path = pathToUrl(file.path);
        }
        
        return file;
    } catch (error) {
        console.error(error);
        throw error;
    }
};