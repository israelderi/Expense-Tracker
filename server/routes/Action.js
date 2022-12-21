import express from "express";
import { getActions, createAction, deleteAction, getActionsByType } from "../controllers/action.js";

const router = express.Router();

router.get('/get/:id', getActions);
router.post('/create/:id', createAction);
router.delete('/delete/:id/:userid', deleteAction);
router.get('/getbytype/:id', getActionsByType);

export default router;