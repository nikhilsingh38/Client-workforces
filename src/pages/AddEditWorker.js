import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createWorker, updateWorker } from "../redux/features/workerSlice";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditWorker = () => {
  const [workerData, setWorkerData] = useState(initialState);
    const { error, loading } = useSelector((state) => ({ ...state.worker }));
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const navigate = useNavigate();


  const { title, description, tags } = workerData;

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
      e.preventDefault();
      if (title && description && tags) {
          const updatedWorkerData = { ...workerData, name: user?.result?.name };
          dispatch(createWorker({ updatedWorkerData, navigate, toast }));
          handleClear();
      }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setWorkerData({ ...workerData, [name]: value });
  };

  const handleAddTag = (tag) => {
    setWorkerData({ ...workerData, tags: [...workerData.tags, tag] });
  };

  const handleDeleteTag = (deleteTag) => {
    setWorkerData({
      ...workerData,
      tags: workerData.tags.filter((tag) => tag != deleteTag),
    });
  };

  const handleClear = () => {
    setWorkerData({ title: "", description: "", tags: [] });
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>Add Worker</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <input
                placeholder="Enter Title"
                type="text"
                value={title}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide title"
              />
            </div>
            <div className="col-md-12">
              <textarea
                placeholder="Enter Description"
                type="text"
                style={{ height: "100px" }}
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide description"
              />
            </div>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Category"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setWorkerData({ ...workerData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>Submit</MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditWorker;
