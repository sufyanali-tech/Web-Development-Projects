const bcrypt = require("bcrypt");
const User = require("../models/User");

async function handleSignup(req, res) {
    
    let body = "";

    req.on("data",(chunk) => {

        body += chunk.toString();
    })

    req.on("end", async () => {

        try{
            const {username, email, password} = JSON.parse(body);

            if (!username || !email || !password) {
                res.writeHead(400, {"Content-Type": "application/json"});
                return res.end(JSON.stringify({message: "All fields are required"}));
            }

            const exitingUser = await User.findOne({
                $or: [{username},{email}]
            });

            if (exitingUser) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'Username or email already taken' }));
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new User({
                username,
                email,
                password: hashedPassword
            })

            await newUser.save();

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User created successfully' }));

        }
        catch(error) {

            res.writeHead(500, {"Content-Type": "appliction/json"})
            res.end(JSON.stringify({message: "Server error", error: error.message}))
        }

    })
}

async function handleLogin(req , res) {
    
    let loginData = ""

    req.on("data", (chunk) => {

        loginData += chunk.toString();
    })

    req.on("end", async () => {

        try {
            const {username , password} = JSON.parse(loginData);

            if (!username || !password) {
                
                res.writeHead(400,{"Content-Type": "application/json"});
                return res.end(JSON.stringify({message: "All fields are required"}))
            }

            const existingUser = await User.findOne({username});
            if (!existingUser) {
                
                res.writeHead(400,{"Content-Type": "application/json"})
                return res.end(JSON.stringify({message: "Invalid username or password"}))
            }

            const isMatch = await bcrypt.compare(password, existingUser.password)
            if (!isMatch) {
                
                res.writeHead(400,{"Content-Type": "application/json"})
                return res.end(JSON.stringify({message: "Invalid username or password"}))
            }

            res.writeHead(200,{"Content-Type":"application/json"})
            res.end(JSON.stringify({message: "Login successful", username:existingUser.username}))
        }
        catch(error) {
            res.writeHead(500,{"Content-Type":"application/json"})
            res.end(JSON.stringify({message:"Server error", error: error.message}))
        }
    })
}

async function handleCheckEmail(req, res) {
    
    let userEmail = "";

    req.on("data", (chunk) => {

        userEmail += chunk.toString();
    })

    req.on("end", async () => {

        try {
            const { email } = JSON.parse(userEmail);

            if (!email) {
                
                res.writeHead(400, { "Content-Type": "appliction/json" })
                return res.end(JSON.stringify({message: "Email is required"}))
            }

            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                res.writeHead(400, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "Email not found" }));
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Email verified", username: existingUser.username }));

        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Server error", error: error.message }));
        }
    })
}

module.exports = { handleSignup, handleLogin, handleCheckEmail};