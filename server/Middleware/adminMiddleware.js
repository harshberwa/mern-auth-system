export const isAdmin = (req, res, next) => {
	if (req.user && req.user.userType === 1) {
		next();
	} else {
		res.status(403).json({ message: "Admin access only" });
	}
};
