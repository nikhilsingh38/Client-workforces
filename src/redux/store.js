import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import WorkerReducer from "./features/workerSlice";


export default configureStore({
  reducer: {
        auth: AuthReducer,
      worker: WorkerReducer,
  },
});
