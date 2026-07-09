const bcrypt = require("bcrypt");
const User = require("../models/User");
const sendResetEmail = require("../utils/sendEmail");

async function handleSignup(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const { username, email, password } = JSON.parse(body);

      if (!username || !email || !password) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "All fields are required" }));
      }

      const exitingUser = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (exitingUser) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Username or email already taken" }),
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Account Created Successfully" }));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "appliction/json" });
      res.end(
        JSON.stringify({ message: "Server error", error: error.message }),
      );
    }
  });
}

async function handleLogin(req, res) {
  let loginData = "";

  req.on("data", (chunk) => {
    loginData += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const { username, password } = JSON.parse(loginData);

      if (!username || !password) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "All fields are required" }));
      }

      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Invalid username or password" }),
        );
      }

      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Invalid username or password" }),
        );
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Login successful",
          username: existingUser.username,
        }),
      );
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Server error", error: error.message }),
      );
    }
  });
}

async function handleForgotPassword(req, res) {
  let userEmail = "";

  req.on("data", (chunk) => {
    userEmail += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const { email } = JSON.parse(userEmail);

      if (!email) {
        res.writeHead(400, { "Content-Type": "appliction/json" });
        return res.end(JSON.stringify({ message: "Email is required" }));
      }

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Email not found" }));
      }

      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

      existingUser.resetCode = resetCode;
      existingUser.resetCodeExpiry = Date.now() + 10 * 60 * 1000;
      await existingUser.save();

      await sendResetEmail(userEmail, resetCode);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Reset code sent to your email" }));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Server error", error: error.message }),
      );
    }
  });
}
async function handleVerifyCode(req, res) {

  let emailAndVerifyCode = "";

  req.on("data", (chunk) => {

    emailAndVerifyCode += chunk.toString();
  });
  req.on("end", async () => {
    try {
      const { email, verifyCode } = JSON.parse(emailAndVerifyCode);

      if (!email || !code) {

        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Email and Code both required" }),
        );
      }

      const exitingUser = await User.findOne({ email });

      if (!exitingUser) {

        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Invalid request" }));
      }

      if (existingUser.resetCode !== verifyCode) {

        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Verification Code Incorrect" }),
        );
      }

      if (Date.now() > existingUser.resetCodeExpiry) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Code has expired" }));
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Code Verification Sccessfully" }));

    } catch (error) {

        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Server error", error: error.message }));
    }
  });
}

async function handleResetPassword(req, res) {
    
    let resetData = ""

    req.on("data", (chunk) => {

        resetData += resetData.toString();
    })

    req.on("end", async () => {

        try {
            const {email, resetPassword} = JSON.parse(resetData);

        if (!email || !resetPassword) {
            
            res.writeHead(400, {"Content-Type": "application/json"})
            return res.end(JSON.stringify({message: "Email and Reset Password Required"}))
        }

        const exitingUser = await User.findOne({email});

        if (!exitingUser) {
            
            res.writeHead(400, {"Content-Type": "application/json"})
            return res.end(JSON.stringify({message: "User Not find"}))
        }

        const hashedPassword = await bcrypt.hash(resetPassword, 10);

        existingUser.password = hashedPassword;
        existingUser.resetCode = null;
        exitingUser.resetCodeExpiry = null;
        existingUser.save()

        res.writeHead(200, {"Content-Type": "application/json"})
        return res.end(JSON.stringify({message: "Password reset Successfully"}))

        } catch(error) {
            
            res.writeHead(400, {"Content-Type": "application/json"})
            return res.end(JSON.stringify({message: "Server Error"}))

        }
    })
}

module.exports = { handleSignup, handleLogin, handleForgotPassword, handleVerifyCode, handleForgotPassword};
