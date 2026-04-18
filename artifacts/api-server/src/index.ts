import app from "./app";
import { logger } from "./lib/logger";

// Check if we are running in Vercel's serverless environment
const isVercel = process.env.VERCEL === "1";

// If we are NOT on Vercel, run the traditional server (for local dev)
if (!isVercel) {
  const rawPort = "3000"; // Added a fallback just in case
  
  if (!rawPort) {
    throw new Error(
      "PORT environment variable is required but was not provided.",
    );
  }

  const port = Number(rawPort);

  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid PORT value: "${rawPort}"`);
  }

  app.listen(port, (err?: any) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Local server listening");
  });
}

// 👈 THE FIX: Export the app for Vercel to consume as a Serverless Function
export default app;
