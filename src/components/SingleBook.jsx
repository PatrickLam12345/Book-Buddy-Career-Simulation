import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

export default function SingleBook() {
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUserSlice);
  const [bookDetails, setBookDetails] = useState([]);
  const { bookId } = useParams();
  useEffect(() => {
    const getBook = async () => {
      try {
        const { data } = await axios.get(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`
        );

        setBookDetails([data.book]);
        // console.log(bookDetails, "deets");
      } catch (error) {
        console.log(error);
      }
    };

    getBook();
    console.log(bookDetails);
  }, [bookId]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid container spacing={3} style={{ position: "center" }}>
        {bookDetails.map((book, index) => {
          return (
            <Grid key={index} item xs={4}>
              <Card style={{ position: "relative" }}>
                <CardContent>
                  <Typography
                    align={"center"}
                    variant="body1"
                    sx={{ fontWeight: "bold" }}
                  >
                    {book.title}
                  </Typography>
                  <Typography align={"center"} variant="body1">
                    {book.author}
                  </Typography>
                  <CardMedia
                    component="img"
                    alt={`${book.title} image`}
                    height="140"
                    image={book.coverimage}
                  />
                  <Typography align={"center"} variant="body1">
                    {book.description}
                  </Typography>
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
                      </>
                    ))}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
