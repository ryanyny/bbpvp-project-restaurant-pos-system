const express = require("express")
const { isVerifiedUser } = require("../middlewares/tokenVerification")
const {
    createTable,
    getTables,
    updateTable,
    deleteTable,
} = require("../controllers/tableController")

const router = express.Router()

router.route("/").post(isVerifiedUser, createTable)
router.route("/").get(isVerifiedUser, getTables)
router.route("/:id").put(isVerifiedUser, updateTable)
router.route("/:id").delete(isVerifiedUser, deleteTable)

module.exports = router