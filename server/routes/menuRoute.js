// routes/menuRoutes.js (Contoh)
const express = require('express');
const { getAllMenusWithItems, createMenu, createItem, updateMenu, deleteMenu } = require('../controllers/menuController');
const { isVerifiedUser } = require("../middlewares/tokenVerification")

const router = express.Router();

router.route("/").get(getAllMenusWithItems);
// 2. Rute untuk membuat Kategori Menu baru (POST /api/menus)
// Catatan: Biasanya hanya admin yang boleh menambah, jadi kita lindungi dengan isVerifiedUser
router.route("/").post(isVerifiedUser, createMenu); 

// 3. Rute untuk membuat Item baru (POST /api/menus/item)
// Kita buat rute POST terpisah untuk Item
router.route("/item").post(isVerifiedUser, createItem); 
// PUT update menu
router.put("/:id", updateMenu);

// DELETE menu
router.delete("/:id", deleteMenu);

module.exports = router;