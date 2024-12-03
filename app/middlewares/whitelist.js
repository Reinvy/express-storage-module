require('dotenv').config();

const whitelistIps = process.env.WHITELIST_IPS?.split(',') || []; // Ambil dan pecah daftar IP dari .env

module.exports = (req, res, next) => {

    console.log(req.ip);
    console.log(req.socket.remoteAddress);
    console.log(req.headers['x-forwarded-for']);
   
    // Mendapatkan IP client
    const clientIp = req.ip; 

    // Logika untuk IPv6-mapped IPv4
    const normalizedIp = clientIp.startsWith('::ffff:') ? clientIp.replace('::ffff:', '') : clientIp;

    // Periksa apakah IP ada di whitelist
    if (whitelistIps.includes(clientIp) || whitelistIps.includes(normalizedIp)) {
        // Lanjutkan ke endpoint jika IP diizinkan
        next(); 
    } else {
        return res.status(403).json({ 
            success: false,
            message: 'Access denied' 
        });
    }
}