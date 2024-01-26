CREATE TABLE Members (
  Code VARCHAR(10) PRIMARY KEY,
  MemberName VARCHAR(255) NOT NULL,
  PenaltyStatus BOOLEAN NOT NULL DEFAULT FALSE,
  PenaltyDate DATE DEFAULT NULL
);

INSERT INTO Members (Code, MemberName)
VALUES
  ('M001', 'Angga'),
  ('M002', 'Ferry'),
  ('M003', 'Putri');


CREATE TABLE Books (
  Code VARCHAR(10) PRIMARY KEY,
  Title VARCHAR(255) NOT NULL,
  Author VARCHAR(255) NOT NULL,
  Stock INT NOT NULL DEFAULT 1 
);

INSERT INTO Books (Code, Title, Author, Stock)
VALUES
  ('JK-45', 'Harry Potter', 'J.K Rowling', 1),
  ('SHR-1', 'A Study in Scarlet', 'Arthur Conan Doyle', 1),
  ('TW-11', 'Twilight', 'Stephenie Meyer', 1),
  ('HOB-83', 'The Hobbit, or There and Back Again', 'J.R.R. Tolkien', 1),
  ('NRN-7', 'The Lion, the Witch and the Wardrobe', 'C.S. Lewis', 1);


 CREATE TABLE BorrowedBook (
    BorrowedBookID SERIAL PRIMARY KEY,
    MemberID VARCHAR NOT NULL,
    BookID VARCHAR NOT NULL,
    BorrowDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ReturnDate TIMESTAMP,
    CONSTRAINT fk_member FOREIGN KEY (MemberID) REFERENCES Members(Code),
    CONSTRAINT fk_book FOREIGN KEY (BookID) REFERENCES Books(Code)
);
