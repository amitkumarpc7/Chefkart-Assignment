const request = require("supertest");
const app = require("../index");
const Post = require("../models/Post");
const User = require("../models/User");

// Mock the User and Post models to avoid database interactions
jest.mock("../models/Post");
jest.mock("../models/User");

describe("Post API", () => {
  // Mock user data
  const mockUser = {
    _id: "12345",
    name: "Test User",
    mobileNumber: 9876543210,
    address: "Test Address",
  };

  // Mock post data
  const mockPost = {
    _id: "67890",
    userId: mockUser._id,
    title: "Test Post",
    description: "This is a test post.",
    images: ["https://picsum.photos/200"],
  };

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

  // Test for creating a new post
  it("should create a new post", async () => {
    // Mock User and Post model methods
    User.create.mockResolvedValue(mockUser);
    Post.create.mockResolvedValue(mockPost);

    // Send POST request to create a post
    const res = await request(app)
      .post("/api/posts")
      .send({
        userId: mockUser._id,
        title: "Test Post",
        description: "This is a test post.",
        images: ["https://picsum.photos/200"],
      });

    // Checking for the responses
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      _id: mockPost._id,
      title: "Test Post",
      userId: mockUser._id,
      description: "This is a test post.",
      images: mockPost.images,
    });
  });

  // Test for getting all posts
  it("should get all posts", async () => {
    // Mock Post.find to return mock posts
    Post.find.mockResolvedValue([mockPost]);

    // Send GET request to fetch posts
    const res = await request(app).get("/api/posts");

    // Checking for responses
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toMatchObject(mockPost);
  });

  // Test for error handling when required fields are missing
  it("should return an error if required fields are missing", async () => {
    // Send POST request with missing fields here title
    const res = await request(app)
      .post("/api/posts")
      .send({
        userId: mockUser._id,
        description: "This is a test post.",
        images: ["https://picsum.photos/200"],
      });

    // Checking the responses
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
