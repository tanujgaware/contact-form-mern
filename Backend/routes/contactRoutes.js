import { Router } from "express";
import { deleteContact, getContacts, postContact } from "../controllers/contact.js";
import { wrapAsync } from "../utils/wrapAsync.js";
const router=Router();

router.route('/').post(wrapAsync(postContact));
router.route("/").get(wrapAsync(getContacts));
router.route("/:id").delete(wrapAsync(deleteContact));

export {router};