const { fstat } = require("fs");
const path = require("path");
const readLine = require("readline");
const fs = require("fs");
const Book = require("./book");

class BooksRepository {
  constructor() {
    this.filepath = path.join(__dirname, "books.csv");
  }

  /**
   *
   * @param {Book} book
   */
  async insertBook(book) {
    const data = `\n${book.id},${book.title}`;
    await fs.appendFile(this.filepath, data, (error) => {
      if (error) {
        throw error;
      }
    });
  }

  async listBooks() {
    const fileStream = fs.createReadStream(this.filepath);

    const rl = readLine.createInterface({
      // read line by line
      input: fileStream,
      crlfDelay: Infinity,
    });

    const books = [];

    for await (const line of rl) {
      const [id, title] = line.split(","); // separar o conteúdo por vírgula

      const book = new Book(id, title);

      books.push(book); // adicionar livro, equivalente ao append no python
    }
    return books; // retorna lista de livros
  }
}

module.exports = BooksRepository;
