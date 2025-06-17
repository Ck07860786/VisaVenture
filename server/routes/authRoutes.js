import express from "express";
import {
  agentLoginController,
  agentsignUpController,
  loginController,
  serachAgentController,
  usersignUpController,
} from "../controllers/authController.js";
import { isAdmin, isAgent, isUser, requireSignIn } from "../middleware/authmiddleware.js";
const router = express.Router();

//userRoutes

router.post("/user-signup", usersignUpController);
router.post("/user-login", loginController);

//agents routes

router.post("/agent-signup", agentsignUpController);
router.post("/agent-login", agentLoginController);


//private route
router.get("/agent-auth",requireSignIn,isAgent,(req,res)=>{
  res.status(200).send({
    ok:true,
  });
})

//usesr access

router.get('/user-auth',requireSignIn,isUser,(req,res)=>{
  res.status(200).send({ok:true})
});

router.get('/search',serachAgentController)



export default router;





