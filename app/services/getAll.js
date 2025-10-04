const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { pathToUrl } = require('../utils/pathUtils');

module.exports = async () => {
    try {
        const files = await prisma.file.findMany();
        
        // Transform path to web-accessible URL for each file
        const transformedFiles = files.map(file => ({
            ...file,
            path: pathToUrl(file.path)
        }));
        
        return transformedFiles;
    } catch (error) {
        console.error(error);
        throw error;
    }
};