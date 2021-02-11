class Book {
  /**
   * @param {String} id
   * @param {String} title
   * @param {URL} coverUrl
   * @param {URL} bookUrl
   * @param {String} review
   */
  constructor(id, title, coverUrl, bookUrl, review) {
    this.id = id;
    this.title = title;
    this.coverUrl = coverUrl;
    this.bookUrl = bookUrl;
    this.review = review;
  }
}

module.exports = Book;
