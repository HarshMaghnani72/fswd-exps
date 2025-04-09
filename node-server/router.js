const studentController = require("./student");
const express = require("express");
const router = express.Router();

router.get("/getAllBooks", studentController.getAllBooks);
router.get("/getBook/:book_id", studentController.getBook);
router.post("/addBook", studentController.createBook);
router.put("/updateBook/:book_id", studentController.updateBook);
router.delete("/deleteBook/:book_id", studentController.deleteBook);

module.exports = router;