import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHomeContent } from "../Utils/contentSlice";
const useFetcHomePage = (token) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHomePageDetails(token);
  }, [token]);

  const fetchHomePageDetails = async (token) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/products/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data?.products);
      dispatch(setHomeContent(response.data));
    } catch (error) {
      console.log("This is the error : " + error);
      localStorage.removeItem("token");
      navigate("/");
    }
  };
};

export default useFetcHomePage;
