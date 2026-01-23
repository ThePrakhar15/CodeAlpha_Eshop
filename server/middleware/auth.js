import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    console.log("HEADERS ", req.headers);

    try {
        const authHeader = req.headers.authorization;
        console.log("auth Header", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({ message: "NO token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // req.userID = decode.id;
        req.user = {
            id: decoded.id,
            role: decoded.role
        };
        next();

    } catch (error) {
        console.error(" auth middleware error", error);
        res.status(401).json({ message: "Invalid token" });
    }
};

export default authMiddleware;