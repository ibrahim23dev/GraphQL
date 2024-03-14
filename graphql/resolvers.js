// resolvers.js

const Book = require('../models/Book');

const resolvers = {
  Query: {
    books: () => Book.find(),
    book: (_, { id }) => Book.findById(id),
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const book = new Book({ title, author });
      return book.save();
    },
    updateBook: (_, { id, title, author }) => {
      return Book.findByIdAndUpdate(id, { title, author }, { new: true });
    },
    deleteBook: (_, { id }) => {
      return Book.findByIdAndDelete(id).then(() => id);
    },
  },
};

module.exports = resolvers;
