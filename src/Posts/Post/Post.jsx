import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import MoreHoziIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../Redux/actions/post";
import { useLocation } from "react-router-dom";

const Post = ({ post, currentId, setCurrentId }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  let user = JSON.parse(localStorage.getItem("UserProfile"));
  useEffect(() => {
    user = JSON.parse(localStorage.getItem("UserProfile"));
  }, [location]);
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
  return (
    <div>
      <Card className={styles.card}>
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
        <div className={styles.overlay2}>
          {user?.result?.googleId === post.creator ||
          user?.result?._id === post.creator ? (
            <Button
              size="small"
              className={styles.moreIcon}
              onClick={() => {
                setCurrentId(post._id);
              }}
            >
              <MoreHoziIcon size="default" />
            </Button>
          ) : (
            ""
          )}
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
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {post.message}
          </Typography>
        </CardContent>
        <CardActions className={styles.cardActions}>
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={() => {
              dispatch(likePost(post._id));
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
                dispatch(deletePost(post._id));
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
