import React, { useEffect, useState } from "react";
import { Container, Grid, Grow } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/form";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { getPosts } from "../Redux/actions/post";
import Navbar from "../Navbar/navbar";

const Home = (props) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <div>
      <Navbar />
      <Container maxWidth="xl">
        <Grow in>
          <Container>
            <Grid container spacing={3} className={styles.formSection}>
              <Grid item sm={12} md={8}>
                <Posts currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
              <Grid item sm={12} md={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </div>
  );
};

export default Home;
