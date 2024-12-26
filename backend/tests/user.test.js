const request = require("supertest");
const app = require("../index");
const User = require("../models/User");

jest.mock("../models/User");

let server;

beforeAll(() => {
  // Start the server for tests
  server = app.listen(5001); // Use a different port to avoid conflicts
});

afterAll(() => {
  // Ensure the server is closed after tests are done
  server.close();
});

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Mock user data to be used in tests
const mockUser = {
  _id: "12345",
  name: "Test User",
  mobileNumber: 1234567890,
  address: "Test Address",
  postCount: 0,
};

describe("User API", () => {
  it("should create a new user", async () => {
    User.create.mockResolvedValue(mockUser);

    // Make a POST request to create a user
    const res = await request(app).post("/api/users").send({
      name: "Test User",
      mobileNumber: 1234567890,
      address: "Test Address",
    });

    // Checking the Responses
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Test User");
    expect(res.body.mobileNumber).toBe(1234567890);
    expect(res.body.address).toBe("Test Address");
    expect(res.body.postCount).toBe(0);
  });

  //for fetching all users
  it("should get all users", async () => {
    User.find.mockResolvedValue([mockUser]);

    const res = await request(app).get("/api/users");

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Test User");
    expect(res.body[0].mobileNumber).toBe(1234567890);
    expect(res.body[0].postCount).toBe(0);
  });

  //for error handling when fields are empty
  it("should return an error if required fields are missing", async () => {
    const res = await request(app).post("/api/users").send({
      mobileNumber: 1234567890,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
