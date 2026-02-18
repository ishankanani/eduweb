import LibraryBook from "../models/LibraryBook.js";
import BookIssue from "../models/BookIssue.js";
import Student from "../models/Student.js";

/* ➕ Add Book */
export const addBook = async (req, res) => {
  const book = await LibraryBook.create({
    ...req.body,
    availableCopies: req.body.totalCopies,
    schoolId: req.user.schoolId
  });

  res.status(201).json(book);
};

/* 📚 Get all books (School) */
export const getBooks = async (req, res) => {
  const books = await LibraryBook.find({
    schoolId: req.user.schoolId
  }).sort({ title: 1 });

  res.json(books);
};

/* 📤 Issue book to student */
export const issueBook = async (req, res) => {
  const { bookId, studentId, dueDate } = req.body;

  const book = await LibraryBook.findOne({
    _id: bookId,
    schoolId: req.user.schoolId
  });

  if (!book || book.availableCopies < 1) {
    return res.status(400).json({ message: "Book not available" });
  }

  const student = await Student.findOne({
    _id: studentId,
    schoolId: req.user.schoolId
  });

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  await BookIssue.create({
    bookId,
    studentId,
    dueDate,
    schoolId: req.user.schoolId
  });

  book.availableCopies -= 1;
  await book.save();

  res.json({ message: "Book issued successfully" });
};

/* 📥 Return book */
export const returnBook = async (req, res) => {
  const { issueId } = req.body;

  const issue = await BookIssue.findOne({
    _id: issueId,
    schoolId: req.user.schoolId,
    status: "ISSUED"
  });

  if (!issue) {
    return res.status(404).json({ message: "Invalid issue record" });
  }

  issue.status = "RETURNED";
  issue.returnDate = new Date();
  await issue.save();

  const book = await LibraryBook.findById(issue.bookId);
  book.availableCopies += 1;
  await book.save();

  res.json({ message: "Book returned" });
};
