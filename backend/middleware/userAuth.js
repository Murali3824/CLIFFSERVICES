import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const userAuth = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Verify user still exists
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ msg: "User no longer exists" });
        }
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ msg: "Token has expired" });
        }
        res.status(401).json({ msg: "Token is not valid" });
    }
};

export default userAuth;
