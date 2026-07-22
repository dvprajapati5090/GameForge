import express from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import {

    getNotifications,

    markNotificationRead,

    markAllNotificationsRead

} from "../controllers/notification.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.get(

    "/",

    getNotifications

);

router.patch(

    "/read-all",

    markAllNotificationsRead

);

router.patch(

    "/:id/read",

    markNotificationRead

);

export default router;