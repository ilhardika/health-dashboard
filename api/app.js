// Vercel serverless function entry point
import handler from "../dist/index.js";

// Export the handler for Vercel
export default async function (req, res) {
  try {
    return await handler(req, res);
  } catch (error) {
    console.error("Vercel handler error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
}
