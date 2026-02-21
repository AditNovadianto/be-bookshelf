import * as bookModel from "../models/bookModel.js";

// Create
export const insertBook = async (req, res) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;

  try {
    if (!name) {
      return res.status(400).json({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      });
    }

    if (readPage > pageCount) {
      return res.status(400).json({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      });
    }

    const result = await bookModel.insertBook(
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    );

    res.status(201).json({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: { bookId: result.id },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read
export const getBooks = async (req, res) => {
  try {
    const books = await bookModel.getBooks();

    const filteredBooks = books.map(({ id, name, publisher }) => ({
      id,
      name,
      publisher,
    }));

    res.status(200).json({
      status: "success",
      data: { books: filteredBooks },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBooksById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await bookModel.getBooksById(id);

    if (book.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Buku tidak ditemukan" });
    }

    res.status(200).json({
      status: "success",
      data: { book: book },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
export const updateBooksById = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;

  try {
    if (!name) {
      return res.status(400).json({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      });
    }

    if (readPage > pageCount) {
      return res.status(404).json({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      });
    }

    const updatedRes = await bookModel.updateBooksById(
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    );

    if (updatedRes.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Buku gagal diperbarui. Id tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
export const deleteBooksById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRes = await bookModel.deleteBooksById(id);

    if (deletedRes.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Buku berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
