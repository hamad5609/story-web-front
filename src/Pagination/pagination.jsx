import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Paginate = (props) => {
  const styles = useStyles();
  return (
    <Pagination
      variant="outlined"
      classes={{ ul: styles.ul }}
      count={5}
      page={1}
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/post?page=${1}`} />
      )}
    />
  );
};

export default Paginate;
