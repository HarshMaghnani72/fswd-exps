const { getAllBooks, createBook, getBook, updateBook, deleteBook } = require("./student");

const simulate = async () => {
  console.log("========== Creating a New Book ==========");
  await createBook(
    {
      body: {
        book_id: 1,
        book_name: "The Alchemist",
        category_name: "Fiction",
        book_author: "Paulo Coelho",
        isbn_number: "978-0062315007",
        edi_number: "1",
        year_publication: "1988",
      },
    },
    { json: console.log }
  );

  console.log("\n========== Fetching All Books ==========");
  await getAllBooks({}, { json: console.log });

  console.log("\n========== Fetching Book with ID 1 ==========");
  await getBook({ params: { book_id: 1 } }, { json: console.log });
};

// Run the test script
simulate();
