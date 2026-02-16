// router/general.js
const express = require('express');
const axios = require('axios').default;
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  // extract username and password from request body
  const username = req.body.username;
  const password = req.body.password;

  // check if both username and password are provided
  if (username && password) {
    // if username isn't a valid username, add it to the users array
    if (!isValid(username)) {
      users.push({"username": username, "password": password});
      return res.status(201).json({message: "User registered successfully"});
    } else {
      return res.status(400).json({message: "Username already exists"});
    }
  }
  // return error message if username or password is not provided
  return res.status(400).json({message: "Unable to register user. Please provide username and password"});
});

// async/await methods with Axios 
public_users.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000");
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error fetching books:", error.message);
    return res.status(error.status).json({ message: "Error retrieving book list" });
  }
});

public_users.get("/isbn/:isbn", async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error fetching book details:", error.message);
    return res.status(error.status).json({ message: "Error retrieving book details" });
  }
});

public_users.get("/author/:author", async (req, res) => {
  const author = req.params.author;
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error fetching book details:", error.message);
    return res.status(error.status).json({ message: "Error retrieving book details" });
  }
});

public_users.get("/title/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error fetching book details:", error.message);
    return res.status(error.status).json({ message: "Error retrieving book details" });
  }
});

/* // Get the book list available in the shop
public_users.get('/',function (req, res) {
  // return all books in books object
  return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  // extract ISBN from request params
  const isbn = req.params.isbn;
  // if books[isbn] return book details for the given ISBN in JSON format
  if (books[isbn]) {
    return res.send(JSON.stringify(books[isbn], null, 4));
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  // extract author from request params
  const author = req.params.author;
  let booksKeys = Object.values(books);
  let filteredBooks = booksKeys.filter(book => book.author === author);
  return res.status(200).send(JSON.stringify(filteredBooks, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  // extract author from request params
  const title = req.params.title;
  let booksKeys = Object.values(books);
  let filteredBooks = booksKeys.filter(book => book.title === title);
  return res.send(JSON.stringify(filteredBooks, null, 4));
});
*/

//  Get book review
public_users.get('/review/:isbn', (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  return res.send(books[isbn].reviews);
});

module.exports.general = public_users;
