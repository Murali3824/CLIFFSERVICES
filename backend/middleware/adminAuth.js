import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized, Login Again"
            });
        }
        
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // console.log('Decoded Token:', decoded);
        // console.log('Admin Email:', process.env.ADMIN_EMAIL);

        // Verify admin email
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({
                success: false,
                message: "Access Denied: Only admin can perform this action"
            });
        }

        req.admin = decoded;
        next();
    } catch (error) {
        console.error("Admin Auth Middleware Error:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid Token, Please Login Again"
        });
    }
};
export default adminAuth;
