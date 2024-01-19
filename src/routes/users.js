"use strict";
const express = require("express");
const { viewItems, bookItems } = require("../controllers/userController");
const router = express.Router();

router.get("/user/viewItems", viewItems);
router.post("/user/bookItems", bookItems);

module.exports = router;
