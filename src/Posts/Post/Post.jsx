import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import MoreHoziIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../Redux/actions/post";
import { IsUser } from "../../Auth/user.jsx";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../scrollToTop";

const Post = ({
  post,
  currentId,
  setCurrentId,
  setIsModal,
  setAddPostModal,
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();
  const { currentPage } = useSelector((state) => state.post);
  const user = IsUser();
  const Likes = () => {
    if (post.likes.length > 0) {
      const postLength = post.likes.length;
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          {" "}
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {postLength > 2
            ? `you and ${postLength - 1} others`
            : `${postLength} like${postLength > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;
          {postLength} {postLength > 1 ? "Likes" : "Like"}{" "}
        </>
      );
    } else {
      return (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp; Like
        </>
      );
    }
  };
  const openPost = (post) => {
    history(`/${post}`);
    scrollToTop();
  };
  const handleEdit = (post) => {
    setIsModal(true);
    setCurrentId(post);
    setAddPostModal(false);
  };
  return (
    <div>
      <Card className={styles.card}>
        <div className={styles.overlay2}>
          {user?.result?.googleId === post.creator ||
          user?.result?._id === post.creator ? (
            <Button
              size="small"
              className={styles.moreIcon}
              onClick={() => handleEdit(post._id)}
            >
              <MoreHoziIcon size="default" />
            </Button>
          ) : (
            ""
          )}
        </div>
        <ButtonBase
          className={styles.postButton}
          onClick={() => openPost(post._id)}
        >
          <CardMedia
            className={styles.media}
            image={post.selectedFile}
            title={post.title}
          />
          <div className={styles.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </div>

          <div className={styles.details}>
            <Typography variant="body2" color="textSecondary">
              {post.tag.map((tag) => `#${tag}`)}
            </Typography>
          </div>
          <CardContent>
            <Typography className={styles.title} gutterBottom>
              {post.title}
            </Typography>
            <Typography
              variant="body2"
              className={styles.para}
              color="textSecondary"
              gutterBottom
            >
              {post.message}
            </Typography>
          </CardContent>
        </ButtonBase>
        <CardActions className={styles.cardActions}>
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={() => {
              dispatch(likePost(post._id, currentPage));
            }}
          >
            <Likes />
          </Button>
          {user?.result?.googleId === post.creator ||
          user?.result?._id === post.creator ? (
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                dispatch(deletePost(post._id, currentPage));
              }}
            >
              <DeleteIcon />
              Delete
            </Button>
          ) : (
            ""
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
