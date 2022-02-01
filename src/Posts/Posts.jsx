import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./Post/Post.jsx";

const Posts = ({ currentId, setCurrentId }) => {
  const { post } = useSelector((state) => state.post);
  const postData = post?.data;
  // if (post) {
  //   console.log(post);
  // }
  return (
    <div>
      {postData && postData.length > 0 && (
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
        </Grid>
      )}
    </div>
  );
};

export default Posts;
