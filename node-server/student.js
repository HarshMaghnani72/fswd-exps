const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "Harsh-new-database"; 
const client = new MongoClient(url);

async function connectDB() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
    console.log("Connected to MongoDB");
  }
  return client.db(dbName);
}

const getAllBooks = async (req, res) => {
  try {
    const db = await connectDB();
    const books = await db.collection("books").find({}).toArray();
    
    if (books.length === 0) {
      console.log("No books found.");
    } else {
      console.log("All Books:", books);
    }
    
    return res.json({ AllBooks: books });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

const createBook = async (req, res) => {
  try {
    const { book_id, book_name, category_name, book_author, isbn_number, edi_number, year_publication } = req.body;

    if (!book_id || !book_name || !category_name || !book_author || !isbn_number || !edi_number || !year_publication)
      return res.status(400).json({ error: "All fields are required" });

    const db = await connectDB();
    const result = await db.collection("books").insertOne({
      book_id,
      book_name,
      category_name,
      book_author,
      isbn_number,
      edi_number,
      year_publication,
    });

    console.log("New Book Added:", result);
    return res.json({ message: "New Book is added", book: result });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

const getBook = async (req, res) => {
  try {
    const bookid = Number(req.params.book_id);
    const db = await connectDB();
    const book = await db.collection("books").findOne({ book_id: bookid });

    if (!book) return res.status(404).json({ error: "No Book found with that ID" });

    return res.json({ message: `Book found with id ${bookid}`, book });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookid = Number(req.params.book_id);
    const db = await connectDB();

    const updatedBook = await db.collection("books").findOneAndUpdate(
      { book_id: bookid },
      { $set: req.body },
      { returnDocument: "after" }
    );

    if (!updatedBook.value) return res.status(404).json({ error: "No Book found with that ID" });

    return res.json({ message: `Book updated successfully`, updatedBook: updatedBook.value });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookid = Number(req.params.book_id);
    const db = await connectDB();

    const deletedBook = await db.collection("books").findOneAndDelete({ book_id: bookid });

    if (!deletedBook.value) return res.status(404).json({ error: "No Book found with that ID" });

    return res.json({ message: `Book deleted successfully`, deletedBook: deletedBook.value });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
};
