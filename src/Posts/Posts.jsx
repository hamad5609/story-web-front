import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./Post/Post.jsx";
import Paginate from "../Pagination/pagination.jsx";

const Posts = ({ currentId, setCurrentId }) => {
  const { post } = useSelector((state) => state.post);
  const { isLoading } = useSelector((state) => state.post);
  const postData = post?.data;
  console.log(isLoading);
  // if (post) {
  //   console.log(post);
  // }
  return (
    <div>
      {!isLoading && postData && postData.length > 0 ? (
        <Grid container spacing={3}>
          {postData.map((post) => {
            return (
              <Grid item key={post._id} xs={12} sm={4}>
                <Post
                  post={post}
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                />
              </Grid>
            );
          })}
          {/* <Paginate /> */}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Posts;
