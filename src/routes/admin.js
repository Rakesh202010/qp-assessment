"use strict";
const express = require("express");
const { addItem, viewItems, removeItems, updateItem, manageInventory } = require("../controllers/adminController");
const router = express.Router();

router.post("/admin/addItem", addItem);
router.get("/admin/viewItems", viewItems);
router.delete("/admin/removeItems", removeItems);
router.put("/admin/updateItem", updateItem);
router.put("/admin/manageInventory", manageInventory);

module.exports = router;
