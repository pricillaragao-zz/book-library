class Book {
  /**
   * @param {String} id
   * @param {String} title
   * @param {URL} coverUrl
   */
  constructor(id, title, coverUrl) {
    this.id = id;
    this.title = title;
    this.coverUrl = coverUrl;
  }
}

module.exports = Book;
