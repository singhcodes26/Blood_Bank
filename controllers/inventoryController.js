const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType, bloodGroup, quantity } = req.body;
    // Validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }

    // Calculate total incoming and outgoing blood for the requested blood group
    const requestedBloodGroup = bloodGroup;

    const totalInOfRequestedBlood = await inventoryModel.aggregate([
      {
        $match: {
          inventoryType: "in",
          bloodGroup: requestedBloodGroup,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$quantity" },
        },
      },
    ]);

    const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
      {
        $match: {
          inventoryType: "out",
          bloodGroup: requestedBloodGroup,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$quantity" },
        },
      },
    ]);

    const totalIn = totalInOfRequestedBlood[0]?.total || 0;
    const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

    // Calculate available blood quantity
    const availableQuantityOfBloodGroup = Math.max(totalIn - totalOut, 0);

    // Quantity validation
    if (inventoryType === "out" && availableQuantityOfBloodGroup < quantity) {
      return res.status(500).send({
        success: false,
        message: `Only ${availableQuantityOfBloodGroup} ml of ${requestedBloodGroup.toUpperCase()} is available`,
      });
    }

    // Assign the user ID to the appropriate field based on inventory type
    if (inventoryType === "out") {
      req.body.hospital = user._id;
    } else {
      req.body.donar = user._id;
    }

    // Save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();

    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Creating Inventory API",
      error,
    });
  }
};

// GET ALL BLOOD RECORDS
const getInventoryController = async (req, res) => {
  try {
    const filters = req.body.filters || {};
    const inventory = await inventoryModel
      .find()
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get All Inventory",
      error,
    });
  }
};

// GET HOSPITAL BLOOD RECORDS
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      //.populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "Get hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Consumer Inventory",
      error,
    });
  }
};

// GET DONAR RECORDS
const getDonarsController = async (req, res) => {
  try {
    const role = "donar";
    //find donars
    const donars = await userModel.find({ role });
    //console.log(donorId);
    //const donars = await userModel.find({ _id: { $in: donorId } });

    return res.status(200).send({
       success: true,
       message: "Donar Record Fetched Successfully",
       donars,
     });
    } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar records",
      error,
    });
  }
};

const getHospitalController = async (req, res) => {
  try {
    const role = "hospital"; // Set the role as "hospital"
    // GET HOSPITAL ID
    const hospitalId = await inventoryModel.distinct("hospital", {
      role, // Filter by the "role" field in the inventoryModel
    });
    // FIND HOSPITAL
    const hospitals = await userModel.find({
      _id: { $in: hospitalId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get Hospital API",
      error,
    });
  }
};



module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getInventoryHospitalController,
};