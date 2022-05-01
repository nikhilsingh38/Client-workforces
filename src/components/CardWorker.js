import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const CardWorker = ({ imageFile, description, title, tags, _id, name }) => {
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.subString(0, 45) + " ...";
    }
    return str;
  };
  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
          <div className="top-left">{name}</div>
          <span className="text-start tag-card">
                  {tags.map((tag) => (
                      <Link to={`/workers/tag/${tag}`}> #{tag}</Link>
            ))}
          </span>
          <MDBCardBody>
            <MDBCardTitle className="text-start">{title}</MDBCardTitle>
            <MDBCardText className="text-start">
              {excerpt(description)}
            </MDBCardText>
            <Link to={`/worker/${_id}`}>Read More</Link>
          </MDBCardBody>
        
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardWorker;
