import React from "react";
import { useEffect } from "react";
import Navbar from "../../Navbar/navbar";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, getPostsBySearch } from "../../Redux/actions/post";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Grid, Paper, Typography } from "@material-ui/core";
import useStyles from "./styles";
import moment from "moment";

const PostDetails = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const styles = useStyles();
  const { postById, post } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPostById(id));
  }, [id]);
  useEffect(() => {
    if (postById)
      dispatch(
        getPostsBySearch({ search: "none", tags: postById?.tag.join(",") })
      );
  }, [postById]);
  if (!postById) return null;
  const selectedPost = postById;
  const recommendedPosts = post?.data?.filter(
    (item) => item._id !== selectedPost?._id
  );
  const openPost = (id) => {
    history(`/${id}`);
  };
  // if (recommendedPosts) console.log(recommendedPosts);
  return (
    <div>
      <Navbar />
      <Paper className={styles.paper} elevation={6}>
        <div className={styles.card}>
          <div className={styles.textsection}>
            <Typography variant="h4">{selectedPost.title}</Typography>
            <Typography gutterBottom color="textSecondary">
              {`#${selectedPost.tag.join("#")}`}
            </Typography>
            <Typography className={styles.message} variant="body1">
              {selectedPost.message}
            </Typography>
            <Divider className={styles.divider} />
            <Typography>
              <span className={styles.dark}>Created By:</span>{" "}
              {selectedPost.name}
            </Typography>
            <Divider className={styles.divider} />

            <Typography variant="body1">
              {moment(selectedPost.createdAt).fromNow()}
            </Typography>
            <Divider className={styles.divider} />
          </div>
          <div className={styles.imgSection}>
            <img
              className={styles.img}
              src={selectedPost.selectedFile}
              alt="selectedPost image"
            />
          </div>
        </div>
        {recommendedPosts?.length > 0 && (
          <div className={styles.recommendedSection}>
            <Typography variant="body1">You might also like:</Typography>
            <Divider className={styles.divider} />
            <Grid container spacing={3} className={styles.postSection}>
              {recommendedPosts.map((post) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className={styles.cards}
                    onClick={() => openPost(post._id)}
                    key={post._id}
                  >
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography variant="subtitle2">{post.name}</Typography>
                    <Typography variant="subtitle2">{post.message}</Typography>
                    <Typography variant="subtitle1">
                      Likes {post.likes.length}
                    </Typography>
                    <img
                      src={post.selectedFile}
                      className={styles.recommendedImg}
                      width="200px"
                      alt="post"
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default PostDetails;
