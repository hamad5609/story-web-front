import React from "react";
import { useEffect, useState, useRef } from "react";
import Navbar from "../../Navbar/navbar";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  getPostById,
  getPostsBySearch,
  postComment,
  deleteComment,
} from "../../Redux/actions/post";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Toolbar,
  Avatar,
} from "@material-ui/core";
import useStyles from "./styles.jsx";
import moment from "moment";
import { scrollToTop } from "../../scrollToTop";
import { v4 as uuid } from "uuid";

const PostDetails = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const commentsRef = useRef();
  const history = useNavigate();
  const styles = useStyles();
  const { postById, post } = useSelector((state) => state.post);
  const [currentPost, setCurrentPost] = useState(null);
  const [comment, setComment] = useState("");
  const [isComment, setIsComment] = useState();
  const [preventComment, setPreventComment] = useState(false);
  const user = JSON.parse(localStorage.getItem("UserProfile"));
  useEffect(() => {
    dispatch(getPostById(id));
    setCurrentPost(postById);
  }, [id]);
  useEffect(() => {
    if (postById?.comments && !preventComment) {
      setIsComment(postById.comments);
    }
  }, [postById]);

  useEffect(() => {
    const handleRecommendedPosts = (state) => {
      dispatch(getPostsBySearch({ search: "none", tags: state.join(",") }));
    };
    if (state) {
      handleRecommendedPosts(state);
    }
  }, [state]);

  if (!postById) return null;
  const selectedPost = postById;
  const recommendedPosts = post?.data?.filter(
    (item) => item._id !== selectedPost?._id
  );
  const openPost = (post) => {
    history(`/${post._id}`, { state: post.tag });
    scrollToTop();
    setPreventComment(false);
  };
  const handleComments = async () => {
    setPreventComment(false);
    const unique_id = uuid();
    let userComment;
    if (user?.result.googleId) {
      userComment = user?.result;
    } else {
      userComment = user?.result;
    }

    let finalComment = {
      id: unique_id,
      user: userComment,
      message: `${comment}`,
    };
    dispatch(postComment(selectedPost._id, finalComment));

    const addComment = [...isComment, finalComment];
    await setIsComment(addComment);
    setComment("");

    commentsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const handleDeleteComment = async (commentId) => {
    await setPreventComment(true);
    let userComments = {
      commentId: commentId,
    };
    dispatch(deleteComment(selectedPost._id, userComments));

    const deletedComment = isComment.filter(
      (comment) => comment.id !== commentId
    );
    setIsComment(deletedComment);
  };

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
            <div className={styles.commentSection}>
              <div className={styles.allComments}>
                <Typography variant="h6" gutterBottom>
                  Comments
                </Typography>
                <div className={styles.scrollSection}>
                  {isComment &&
                    isComment.length > 0 &&
                    isComment.map((item, index) => {
                      if (typeof item === "object" && item?.message) {
                        let currentUser;
                        if (user?.result.googleId) {
                          currentUser = user?.result?.googleId;
                        } else {
                          currentUser = user?.result?._id;
                        }
                        let userId = item?.user?._id;
                        if (item?.user?.googleId) {
                          userId = item.user.googleId;
                        } else {
                          userId = item?.user?._id;
                        }
                        const commentId = item?.id;
                        return (
                          <div key={index} className={styles.commentCont}>
                            <Toolbar className={styles.toolbar}>
                              <Avatar
                                className={styles.avatar}
                                alt={item?.user?.name}
                                src={item?.user?.imageUrl}
                              >
                                {item?.user?.name.charAt(0)}
                              </Avatar>
                              <Typography
                                variant="subtitle1"
                                className={styles.names}
                              >
                                {item?.user?.name}
                              </Typography>
                            </Toolbar>

                            <Typography
                              variant="subtitle1"
                              className={styles.commentsPara}
                            >
                              {item.message}
                            </Typography>
                            {currentUser === userId && (
                              <Button
                                variant="outlined"
                                className={styles.btnDelete}
                                onClick={() => handleDeleteComment(commentId)}
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                        );
                      }
                    })}
                  <div ref={commentsRef} />
                </div>
              </div>
              {user?.result.name && (
                <div className={styles.commentField}>
                  <Typography variant="h6" gutterBottom>
                    Write a Comment
                  </Typography>
                  <TextField
                    rows={4}
                    name="comment"
                    variant="outlined"
                    label="Comment"
                    multiline
                    fullWidth
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    className={styles.btnComment}
                    color="secondary"
                    fullWidth
                    disabled={!comment}
                    onClick={handleComments}
                  >
                    Submit
                  </Button>
                </div>
              )}
            </div>
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
                    onClick={() => openPost(post)}
                    key={post._id}
                  >
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography variant="subtitle2">{post.name}</Typography>
                    <Typography variant="subtitle2" className={styles.para}>
                      {post.message}
                    </Typography>
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
