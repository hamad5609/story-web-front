import React from "react";
import { useEffect } from "react";
import Navbar from "../../Navbar/navbar";
import { useParams } from "react-router-dom";
import { getPostById } from "../../Redux/actions/post";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Paper, Typography } from "@material-ui/core";
import useStyles from "./styles";
import moment from "moment";

const PostDetails = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const styles = useStyles();
  const { postById } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPostById(id));
  }, [id]);
  if (!postById) return null;
  const post = postById;
  return (
    <div>
      <Navbar />
      <Paper className={styles.paper} elevation={6}>
        <div className={styles.card}>
          <div className={styles.textsection}>
            <Typography variant="h4">{post.title}</Typography>
            <Typography gutterBottom color="textSecondary">
              {`#${post.tag.join(" #")}`}
            </Typography>
            <Typography className={styles.message} variant="body1">
              {post.message}
            </Typography>
            <Divider className={styles.divider} />
            <Typography>
              <span className={styles.dark}>Created By:</span> {post.name}
            </Typography>
            <Divider className={styles.divider} />

            <Typography variant="body1">
              {moment(post.createdAt).fromNow()}
            </Typography>
            <Divider className={styles.divider} />
          </div>
          <div className={styles.imgSection}>
            <img
              className={styles.img}
              src={post.selectedFile}
              alt="post image"
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default PostDetails;
