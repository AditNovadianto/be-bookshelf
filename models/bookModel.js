import { db } from "../config/db.js";
import { nanoid } from "nanoid";

// Create
export async function insertBook(
  name,
  year,
  author,
  summary,
  publisher,
  pageCount,
  readPage,
  reading,
) {
  try {
    const id = nanoid(16);

    const finished = pageCount === readPage;

    const [insertRes] = await db.query(
      "INSERT INTO book (id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt, id_bookshelf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)",
      [
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        1,
      ],
    );

    return { insertId: insertRes.insertId, id };
  } catch (error) {
    console.error("Error storing book:", error);
    throw error;
  }
}

// Read
export async function getBooks() {
  try {
    const [rows] = await db.query("SELECT * FROM book");

    return rows;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}

export async function getBooksById(id) {
  try {
    const [rows] = await db.query("SELECT * FROM book WHERE id = ?", [id]);

    return rows;
  } catch (error) {
    console.error("Error fetching books by id:", error);
    throw error;
  }
}

// Update
export async function updateBooksById(
  id,
  name,
  year,
  author,
  summary,
  publisher,
  pageCount,
  readPage,
  reading,
) {
  try {
    const [updateRes] = await db.query(
      "UPDATE book SET name = ?, year = ?, author = ?, summary = ?, publisher = ?, pageCount = ?, readPage = ?, reading = ?, updatedAt = NOW() WHERE id = ?",
      [
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        id,
      ],
    );

    return updateRes;
  } catch (error) {
    console.error("Error updating books by id:", error);
    throw error;
  }
}

// Delete
export async function deleteBooksById(id) {
  try {
    const [deleteRes] = await db.query("DELETE FROM book WHERE id = ?", [id]);

    return deleteRes;
  } catch (error) {
    console.error("Error deleting books by id:", error);
    throw error;
  }
}
