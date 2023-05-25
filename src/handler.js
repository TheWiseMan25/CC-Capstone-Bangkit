const admin = require("firebase-admin");

const serviceAccount = require("./calmind-33a00-firebase-adminsdk-45455-9cac12e53b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://calmind-33a00-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.database();

const registerAccount = async (request, h) => {
  try {
    const { email, name, password } = request.payload;
    const createdAt = new Date().toISOString();
    const lastLogin = createdAt;
    const user = {
      email,
      name,
      createdAt,
      lastLogin,
    };

    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Save user data in Firebase Realtime Database
    const userId = userRecord.uid;
    await db.ref("users/" + userId).set(user);

    return h
      .response({
        status: "success",
        message: "Registration successful",
      })
      .code(201);
  } catch (error) {
    console.error("Registration error:", error);
    return h
      .response({
        status: "error",
        message: "Registration failed",
      })
      .code(500);
  }
};

module.exports = { registerAccount };
