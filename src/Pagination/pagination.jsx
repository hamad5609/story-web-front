import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Redux/actions/post.js";

const Paginate = ({ page }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.post);
  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);
  return (
    <Pagination
      variant="outlined"
      classes={{ ul: styles.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
