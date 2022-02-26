import {
  Button,
  Paper,
  TextField,
  Typography,
  Zoom,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import React from "react";
import { useState } from "react";
import useStyles from "./styles";
import FileBase64 from "react-file-base64";
import { createPost, updatePost } from "../Redux/actions/post.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IsUser } from "../Auth/user";
import { useNavigate } from "react-router-dom";

const Form = ({
  currentId,
  setCurrentId,
  setIsModal,
  isModal,
  addPostModal,
}) => {
  const styles = useStyles();
  const history = useNavigate();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { currentPage } = useSelector((state) => state.post);
  let postItem = null;
  if (currentId) {
    postItem = post?.data.find((p) => p._id === currentId);
  }
  const user = IsUser();

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tag: "",
    selectedFile: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(postData);
    if (
      postData &&
      postData.title !== "" &&
      postData.message !== "" &&
      postData.tag !== "" &&
      postData.selectedFile !== ""
    ) {
      if (currentId) {
        dispatch(
          updatePost(
            currentId,
            { ...postData, name: user?.result?.name },
            currentPage
          )
        );
      } else {
        dispatch(
          createPost(
            { ...postData, name: user?.result?.name },
            currentPage,
            history
          )
        );
      }
      handleClear();
      setIsModal(false);
    }
  };
  const handleClear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tag: "",
      selectedFile: "",
    });
  };
  useEffect(() => {
    if (postItem) {
      setPostData(postItem);
    }
  }, [postItem]);
  useEffect(() => {
    if (addPostModal) handleClear();
  }, []);

  if (!user?.result?.name) {
    return (
      <Zoom className={styles.ZoomCont} in={isModal}>
        <Paper className={`${styles.paper} ${styles.notSigned}`}>
          <IconButton aria-label="close" onClick={() => setIsModal(false)}>
            <CloseIcon />
          </IconButton>
          <Typography
            align="center"
            variant="h5"
            color="secondary"
            className={`${styles.redHead}`}
          >
            Sorry You are not signed in!
          </Typography>
          <Typography
            align="center"
            variant="h6"
            className={`${styles.notSignedPara}`}
          >
            Please Sign in to create your story or like others story
          </Typography>
        </Paper>
      </Zoom>
    );
  }
  return (
    <Zoom className={styles.ZoomCont} in={isModal}>
      <Paper className={styles.paper}>
        <IconButton aria-label="close" onClick={() => setIsModal(false)}>
          <CloseIcon />
        </IconButton>
        <form
          autoComplete="off"
          noValidate
          className={`${styles.root} ${styles.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h5" className={styles.heading}>
            Create Story
          </Typography>
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            value={postData.title}
            fullWidth
            required
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="message"
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            required
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            name="tag"
            label="Tags"
            variant="outlined"
            required
            fullWidth
            value={postData.tag}
            onChange={(e) =>
              setPostData({ ...postData, tag: e.target.value.split(",") })
            }
          />
          <div className={styles.fileInput}>
            <FileBase64
              multiple={false}
              type="file"
              onDone={(file) => {
                setPostData({ ...postData, selectedFile: file.base64 });
              }}
              value={postData.selectedFile}
            />
          </div>
          <Button
            className={styles.buttonSubmit}
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            type="submit"
          >
            Submit
          </Button>
          <Button
            variant="contained"
            className={styles.btnClear}
            size="large"
            color="secondary"
            fullWidth
            onClick={handleClear}
          >
            Clear
          </Button>
        </form>
      </Paper>
    </Zoom>
  );
};

export default Form;
