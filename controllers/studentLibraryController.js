import Student from "../models/Student.js";
import BookIssue from "../models/BookIssue.js";
import LibraryBook from "../models/LibraryBook.js";

/* 📘 View library books (school-wise) */
export const getLibraryBooksForStudent = async (req, res) => {
  const books = await LibraryBook.find({
    schoolId: req.user.schoolId
  });

  res.json(books);
};

/* 📖 View my issued books */
export const getMyIssuedBooks = async (req, res) => {
  const student = await Student.findOne({
    userId: req.user.userId,
    schoolId: req.user.schoolId
  });

  const issues = await BookIssue.find({
    studentId: student._id
  })
    .populate("bookId", "title author")
    .sort({ issueDate: -1 });

  res.json(issues);
};
