const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");

const bloodGroupDetailsController = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodGroupData = [];

    for (const bloodGroup of bloodGroups) {
      // Calculate the total "in" quantity for the given blood group
      const totalIn = await inventoryModel.aggregate([
        {
          $match: {
            bloodGroup,
            inventoryType: "in",
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$quantity" },
          },
        },
      ]);

      // Calculate the total "out" quantity for the given blood group
      const totalOut = await inventoryModel.aggregate([
        {
          $match: {
            bloodGroup,
            inventoryType: "out",
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$quantity" },
          },
        },
      ]);

      // Calculate the total available blood for the given blood group
      const availableBlood = Math.max((totalIn[0]?.total || 0) - (totalOut[0]?.total || 0), 0);

      // Push data to the bloodGroupData array
      bloodGroupData.push({
        bloodGroup,
        totalIn: totalIn[0]?.total || 0,
        totalOut: totalOut[0]?.total || 0,
        availableBlood,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Blood Group Data Fetched Successfully",
      bloodGroupData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Bloodgroup Data Analytics API",
      error,
    });
  }
};

module.exports = { bloodGroupDetailsController };
