import request from "supertest";
import app from "./src/app.js";

describe("backend health and routing", () => {
  it("returns the root health payload", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toContain("Ecommerce Backend API");
  });

  it("returns the API health payload", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.status).toBe("UP");
  });

  it("returns a standardized 404 payload for unknown routes", async () => {
    const response = await request(app).get("/api/does-not-exist");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain("Cannot find");
  });

});