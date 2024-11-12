import { comparePassword, hashedpassword } from "../helper/authHelper.js";
import agentModel from "../models/agentModel.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'
import agentKycModel from "../models/agentKycModel.js";


export const usersignUpController = async(req,res)=>{
    try {
        const {name,email,phone,password,role}=req.body;

        const existingUser= await userModel.findOne({email})
        if(existingUser){
            return res.status(500).send({
                success:false,
                message:'User already exist with the same email'

            })

        }
        const encrypt = await hashedpassword(password)
        const newUser = await userModel({name,email,phone,password:encrypt,role}).save()

        res.status(200).send({
            success:true,
            message:"User registered successfully",
            newUser: {
                name:newUser.name,
                email:newUser.email,
                phone:newUser.phone,
               

            }
        })
        
    } catch (error) {

        console.log(error)
        res.status(500).send({
            success:false,
            message:"somthing went wrong",
            error,
        })
    }
}


export const agentsignUpController = async(req,res)=>{
    try {
        const {name,email,phone,agencyName,password}=req.body;

        const existingAgent= await agentModel.findOne({email})
        if(existingAgent){
            return res.status(500).send({
                success:false,
                message:'Agent already exist with the same email'

            })

        }
        const encrypt = await hashedpassword(password)
        const newAgent = await agentModel({name,email,phone,password:encrypt}).save()

        res.status(200).send({
            success:true,
            message:"Agent registered successfully",
            newAgent: {
                name:newAgent.name,
                email:newAgent.email,
                phone:newAgent.phone,
               

            }
        })
        
    } catch (error) {

        console.log(error)
        res.status(500).send({
            success:false,
            message:"somthing went wrong",
            error,
        })
    }
}


export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not registered",
      });
    }

    // Compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate token with user role included
    const token = JWT.sign(
      { _id: user._id, role: user.role }, // Include role in JWT payload
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    // Send user data along with token
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role, // Role of the user
        token,
      },
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).send({
      success: false,
      message: "Server error during login",
    });
  }
};

export const agentLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const agent = await agentModel.findOne({ email });

        if (!agent) {
            return res.status(500).send({
                success: false,
                message: 'Agent not registered',
            });
        }

        const match = await comparePassword(password, agent.password);

        if (!match) {
            return res.status(500).send({
                success: false,
                message: 'Incorrect password',
            });
        }

        // Generate JWT token
        const token = await JWT.sign({ _id: agent._id }, process.env.JWT_KEY, { expiresIn: '1d' });

        const kyc = await agentKycModel.findOne({ agentId: agent._id });
  const isKycSubmitted = kyc;

        // Send response with agent details
        res.status(200).send({
            success: true,
            message: 'Login successful',
            agent: {
                _id: agent._id,         // Include agent ID
                email: agent.email,     // Include agent email
                phone: agent.phone,     // Include agent phone
                name: agent.name, // Include agency name if available
                kycStatus: agent.kycStatus,
                token,
                isKycSubmitted,
    kycStatus: kyc ? kyc.kycStatus : null,              // Include the token
            },
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
};



