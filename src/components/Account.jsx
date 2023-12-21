import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserSlice } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const user = useSelector(selectUserSlice);
  const navigate = useNavigate()
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    const { data } = await axios.get(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setBooks(data.reservation);
  };

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
    getBooks();
  }, []);

  const returnBook = async (bookId) => {
    await axios.delete(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    await getBooks();
  };

  const viewDetails = (bookId) => {
    navigate(`/books/${bookId}`)
  }
  
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
                  {user && (
                    <CardActions style={{ justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => returnBook(book.id)}
                      >
                        Return Book
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => viewDetails(book.id)}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
