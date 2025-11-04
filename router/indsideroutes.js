const express = require("express")
const multer = require("multer")
const storage = multer.memoryStorage();
const {predict, suggestion} = require("../controller/insideController");
const { fetchblogs, fetchvideos } = require("../controller/outsideController");
const upload = multer({storage});

const router = express.Router()

router.post("/predict",upload.single("file"),predict);
router.get("/suggestion/:score/:dish",suggestion);
router.get("/recipe/blogs/:dish",fetchblogs);
router.get("/recipe/videos/:dish",fetchvideos);

module.exports = router
