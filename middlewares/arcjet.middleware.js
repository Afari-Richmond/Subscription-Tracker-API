import aj from "../config/arcjet.js"; // corrected

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Rate limit exceeded" });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot detected" });
      }

      return res.status(403).json({ message: "Access denied" });
    }

    // Only call next() if no decision blocks the request
    next();
  } catch (error) {
    console.log(`Error in arcjet middleware: ${error}`);
    next(error);
  }
};

export default arcjetMiddleware;
