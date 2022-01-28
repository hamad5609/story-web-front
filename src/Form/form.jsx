import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import useStyles from "./styles";
import FileBase64 from "react-file-base64";
import { createPost, updatePost } from "../Redux/actions/post.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Form = ({ currentId, setCurrentId }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.post.find((p) => p._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem("UserProfile"));
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
          updatePost(currentId, { ...postData, name: user?.result?.name })
        );
      } else {
        dispatch(createPost({ ...postData, name: user?.result?.name }));
      }
      handleClear();
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
    if (post) {
      setPostData(post);
    }
  }, [post]);

  if (!user?.result?.name) {
    return (
      <Paper>
        <Typography align="center" variant="h6">
          Please Sign in to create your story or like others story
        </Typography>
      </Paper>
    );
  }
  return (
    <div>
      <Paper>
        <form
          autoComplete="off"
          noValidate
          className={`${styles.root} ${styles.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">Create Story</Typography>
          {/* <TextField
            name="creator"
            label="Your Name"
            variant="outlined"
            value={postData.creator}
            fullWidth
            required
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
          /> */}
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
            size="large"
            color="secondary"
            fullWidth
            onClick={handleClear}
          >
            Clear
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Form;
