import express from "express";
import {
  getAllKycController,
  getKycStatusController,
  submitBusinessDetailController,
  submitPersonalDetailsController,
  updateKycStatus,
} from "../controllers/kycController.js";
import ExpressFormidable from "express-formidable";
import {
  isAdmin,
  isAgent,
  requireSignIn,
} from "../middleware/authmiddleware.js";
const router = express.Router();

router.post(
  "/submit-personal-details",
  requireSignIn,
  isAgent,
  ExpressFormidable(),
  submitPersonalDetailsController
);
router.post(
  "/submit-business-details",
  requireSignIn,
  isAgent,
  ExpressFormidable(),
  submitBusinessDetailController
);
router.put("/update-kyc-status", requireSignIn,isAdmin, updateKycStatus);
router.get("/all-kyc", getAllKycController);

router.get('/kyc-status',requireSignIn,getKycStatusController)

export default router;
