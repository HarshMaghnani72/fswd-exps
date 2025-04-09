const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    book_id: {
      type: Number,
      required: true,
      unique: true,
    },
    book_name: {
      type: String,
      required: true,
    },
    category_name: {
      type: String,
      required: true,
    },
    book_author: {
      type: String,
      required: true,
    },
    isbn_number: {
      type: Number,
      required: true,
      unique: true,
    },
    edi_number: {
      type: Number,
      required: true,
      unique: true,
    },
    year_publication: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = {
  bookSchema,
};
