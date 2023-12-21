import { useSelector } from "react-redux";
import { selectUserSlice } from "../store/userSlice";
import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Books() {
  const user = useSelector(selectUserSlice);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = await axios.get(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
        );
        setBooks(data.books);
      } catch (error) {
        console.log(error);
      }
    };

    getBooks();
    console.log(books);
  }, []);

  const checkout = async (bookId) => {
    const token = window.localStorage.getItem("token");
    console.log(token);
    console.log(bookId);
    try {
      const {
        data: { id },
      } = await axios.patch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`,
        {
          available: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, available: false } : book
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const viewDetails = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <>
      <Grid container spacing={3}>
        {books.map((book, index) => {
          return (
            <Grid key={index} item xs={2}>
              <Card style={{ position: "relative" }}>
                <CardContent>
                  <Typography
                    align={"center"}
                    variant="body1"
                    sx={{ fontWeight: "bold" }}
                  >
                    {book.title}
                  </Typography>
                  <CardMedia
                    component="img"
                    alt={`${book.title} image`}
                    height="140"
                    image={book.coverimage}
                  />
                  {user &&
                    (book.available ? (
                      <CardActions style={{ justifyContent: "center" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => checkout(book.id)}
                        >
                          Checkout Book!
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => viewDetails(book.id)}
                        >
                          View Details
                        </Button>
                      </CardActions>
                    ) : (
                      <>
                        <Typography
                          align={"center"}
                          variant="body1"
                          sx={{ fontWeight: "bold", marginTop: "15px" }}
                        >
                          Book is not available
                        </Typography>
                        <CardActions>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => viewDetails(book.id)}
                          >
                            View Details
                          </Button>
                        </CardActions>
                      </>
                    ))}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
