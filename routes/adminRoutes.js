const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDonarsListController,
  getHospitalListController,
  deleteDonarController,
} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

//router object
const router = express.Router();

//Routes

//GET || DONAR LIST
router.get("/donar-list",authMiddleware,adminMiddleware,getDonarsListController);
//GET || HOSPITAL LIST
router.get("/hospital-list",authMiddleware,adminMiddleware,getHospitalListController);

// ==========================

// DELETE DONAR || GET
router.delete(
  "/delete-donar/:id",authMiddleware, adminMiddleware,deleteDonarController);

//EXPORT
module.exports = router;