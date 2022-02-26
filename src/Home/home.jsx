import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  TextField,
  Modal,
  Backdrop,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useNavigate, useLocation } from "react-router-dom";
import Posts from "../Posts/Posts";
import Form from "../Form/form";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../Redux/actions/post";
import Navbar from "../Navbar/navbar";
import Paginate from "../Pagination/pagination";
import { useQuery } from "../searchQuery/index";

const Home = (props) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const query = useQuery();
  const history = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const tag = query.get("tags");
  const [currentId, setCurrentId] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [addPostModal, setAddPostModal] = useState(false);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  // console.log(location);

  useEffect(() => {
    if (tag || searchQuery) {
      const search = searchQuery;
      dispatch(getPostsBySearch({ search, tags: tag }));
      history(`?searchQuery=${searchQuery}&tags=${tag}`);
      setSearch(searchQuery);
      if (tag !== "") {
        console.log([tag.split(",")]);
        setTags([...tag.split(",")]);
      }
    }
  }, []);

  const searchPost = () => {
    console.log(search, tags);
    if ((search.trim() || tags) && (tags.length !== 0 || search !== "")) {
      // fetch Post
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history(`?searchQuery=${search}&tags=${tags}`);
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
  const handleOpenModal = () => {
    setIsModal(true);
    setAddPostModal(true);
  };
  return (
    <div>
      <Navbar setSearch={setSearch} setTags={setTags} />
      <Container maxWidth="xl" className={styles.mobileContainer}>
        <Grow in>
          <Grid container spacing={3} className={`${styles.formSection}`}>
            <Grid item sm={12} md={9}>
              <Posts
                currentId={currentId}
                setCurrentId={setCurrentId}
                setIsModal={setIsModal}
                setAddPostModal={setAddPostModal}
              />
              {searchQuery || tag ? "" : <Paginate page={page} />}
            </Grid>
            <Grid item sm={12} md={3}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                className={styles.addBtn}
                onClick={handleOpenModal}
              >
                <span className={styles.plusIcon}>+</span> Add Post
              </Button>
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
                  required
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

              <Modal
                open={isModal}
                onClose={() => setIsModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                className={styles.modal}
              >
                <div>
                  <Form
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                    setIsModal={setIsModal}
                    isModal={isModal}
                    addPostModal={addPostModal}
                  />
                </div>
              </Modal>
            </Grid>
          </Grid>
        </Grow>
      </Container>
    </div>
  );
};

export default Home;
