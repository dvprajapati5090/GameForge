import { Router } from "express";

import {
    googleLogin,
    completeGoogleProfile
} from "../controllers/google.controller.js";


const router = Router();


router.post(
    "/",
    googleLogin
);


router.patch(
    "/complete-profile",
    completeGoogleProfile
);


export default router;