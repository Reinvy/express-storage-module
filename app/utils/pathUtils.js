const path = require('path');

/**
 * Convert a system file path to a web-accessible URL
 * @param {string} systemPath - The full system path (e.g., 'D:\Workspace\Javascript\Express\express-storage-module\public\uploads\filename.ext')
 * @returns {string} - The web-accessible URL (e.g., '/uploads/filename.ext')
 */
const pathToUrl = (systemPath) => {
    if (!systemPath) return '';
    
    // Normalize the path to handle different path separators
    const normalizedPath = path.normalize(systemPath);
    
    // Find the 'public' directory in the path
    const publicIndex = normalizedPath.toLowerCase().indexOf('public');
    
    if (publicIndex === -1) {
        // If 'public' is not found, return empty string
        return '';
    }
    
    // Extract the part after 'public'
    const pathAfterPublic = normalizedPath.substring(publicIndex + 'public'.length);
    
    // Convert to forward slashes and remove leading slash
    const urlPath = pathAfterPublic.replace(/\\/g, '/').replace(/^\//, '');
    
    // Only return with leading slash if there's actual content
    return urlPath ? `/${urlPath}` : '';
};

module.exports = {
    pathToUrl
};