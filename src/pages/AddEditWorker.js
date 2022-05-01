import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBInput,
  MDBSpinner,
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
  const { error, loading, userWorkers } = useSelector((state) => ({
    ...state.worker,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, tags } = workerData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleWorker = userWorkers.find((worker) => worker._id === id);
      setWorkerData({ ...singleWorker });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && tags) {
      const updatedWorkerData = { ...workerData, name: user?.result?.name };
      if (!id) {
        dispatch(createWorker({ updatedWorkerData, navigate, toast }));
      } else {
        dispatch(updateWorker({ id, updatedWorkerData, toast, navigate }));
      }

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
        <h5>{id ? "Update Task" : "Add Task"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput
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
              <MDBInput
                placeholder="Enter Description"
                type="text"
                textarea
                rows={4}
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
              <MDBBtn style={{ width: "100%" }}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
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
