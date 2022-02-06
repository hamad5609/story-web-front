import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Redux/actions/post.js";
import { useQuery } from "../searchQuery/index";

const Paginate = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const pageNum = query.get("page") || 1;
  const tag = query.get("tags");
  const { numberOfPages } = useSelector((state) => state.post);
  useEffect(() => {
    if (!searchQuery && !tag && pageNum) dispatch(getPosts(pageNum));
  }, [pageNum]);
  return (
    <Pagination
      variant="outlined"
      classes={{ ul: styles.ul }}
      count={numberOfPages}
      page={Number(pageNum) || 1}
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
