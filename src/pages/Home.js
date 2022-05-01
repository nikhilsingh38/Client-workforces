import React, { useEffect }  from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getWorkers } from "../redux/features/workerSlice";
import CardWorker from '../components/CardWorker';
import Spinner from '../components/Spinner';

const Home = () => {
  const {workers, loading} = useSelector((state) => ({ ...state.worker}))
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkers())
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {workers.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Workers Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {workers &&
                workers.map((item, index) => <CardWorker key={index} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default Home