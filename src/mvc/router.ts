import express from "express";
import { getReservations, postReservationController } from "./controller";

const router = express.Router();

router.route('/')
    .post(getReservations)

router.route('/reserve')
    .post(postReservationController)

export default router;