import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  TextField,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useLocation, useNavigate } from "react-router-dom";
import Posts from "../Posts/Posts";
import Form from "../Form/form";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { getPosts } from "../Redux/actions/post";
import Navbar from "../Navbar/navbar";
import Paginate from "../Pagination/pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = (props) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const query = useQuery();
  const history = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const searchPost = () => {
    if (search.trim()) {
      // fetch Post
    } else {
      history("/");
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      // search
      searchPost();
    }
  };
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  return (
    <div>
      <Navbar />
      <Container maxWidth="xl">
        <Grow in>
          <Container>
            <Grid container spacing={3} className={styles.formSection}>
              <Grid item sm={12} md={8}>
                <Posts currentId={currentId} setCurrentId={setCurrentId} />
                <Paginate />
              </Grid>
              <Grid item sm={12} md={4}>
                <AppBar
                  color="inherit"
                  position="static"
                  className={styles.appBar}
                >
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="search"
                    label="Search"
                    onKeyPress={handleKeyPress}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    value={search}
                  />
                  <ChipInput
                    variant="outlined"
                    className={styles.ChipInput}
                    fullWidth
                    name="tags"
                    label="Search Tags"
                    value={tags}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                  />
                  <Button
                    variant="contained"
                    onClick={searchPost}
                    color="primary"
                    fullWidth
                  >
                    Search
                  </Button>
                </AppBar>
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
