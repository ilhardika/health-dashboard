// Vercel serverless function entry point
const express = require("express");
const path = require("path");

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from dist/public
app.use(express.static(path.join(__dirname, "../dist/public")));

// Basic health check API
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    message: "Health Dashboard API is running",
  });
});

// Mock auth endpoints for now
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  // Simple demo auth
  if (email === "demo@example.com" && password === "password123") {
    res.json({
      token: "demo-jwt-token",
      user: { id: 1, email: "demo@example.com" },
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/api/auth/me", (req, res) => {
  res.json({ id: 1, email: "demo@example.com" });
});

app.get("/api/batch-settings", (req, res) => {
  res.json({
    oldPatientsTarget: 0,
    importSetupId: null,
    hourlyBatchCount: 60,
  });
});

app.post("/api/batch/start", (req, res) => {
  // Simulate processing
  setTimeout(() => {
    res.json({ status: "success", message: "Batch started successfully" });
  }, 1000);
});

// Catch all handler - serve index.html for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/public/index.html"));
});

module.exports = app;
