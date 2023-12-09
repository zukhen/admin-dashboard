import "@/styles/global.scss";
import styles from "./login.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import { validatePassword, validateUsername } from "@/utils/auth-utils";
import Register from "@/pages/register/register";
import { LocalStorageService } from "@/service/local-storage-service";
import {
  ADMIN_DATA,
  ADMIN_ROLES,
  ADMIN_TOKENA,
  ADMIN_TOKENR,
  ADMIN_UUID,
} from "@/service/constant";
import { encryptData } from "@/utils/crypto-utils";
import axios from "axios";
import { handleGetUserInformation } from "@/api/shop";
import { handleLoginAdmin, handleLoginShop } from "@/api/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { handleGetProductCount } from "@/api/product";
import { handleGetUserCount } from "@/api/user";
import { handleGetOrderCount } from "@/api/order";


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setErrorUsername(validateUsername(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrorPassword(validatePassword(value));
  };

  const handleAdminLogin = async (responseAdmin: any) => {
    updateLocalStorage(responseAdmin.data.data);
    const [productResponse, userResponse] = await Promise.all([
      handleGetProductCount(),
      handleGetUserCount(),
    ]);
    localStorage.setItem(
      "totalProduct",
      productResponse?.data.totalProduct.toString()
    );
    localStorage.setItem(
      "totalUser",
      `${userResponse?.data.data.totalShops}T${userResponse?.data.data.totalUser}`
    );
    localStorage.setItem("initialDataFetched", "true");
    navigateToHome();
  };

  const handleShopLogin = async (responseShop: any) => {
    const response = await handleGetUserInformation(
      responseShop.data.data.shop._id
    );
    if (response?.status == 200) {
      const roles = response.data.data.roles[0];

      if (roles == "SHOP") {
         updateLocalStorage(responseShop.data.data);
        navigateToHome();
      } else {
        handleInvalidRole();
      }
    }
  };

  const updateLocalStorage = (data: any) => {
    const accessToken = data.tokens.accessToken;
    const refreshToken = data.tokens.refreshToken;
    const modifiedAccessToken = encryptData(`${accessToken}`);
    const modifiedRefreshToken = encryptData(`${refreshToken}`);
    const modifiedData = encryptData(JSON.stringify(data.admin || data.shop));
  
    LocalStorageService.setTokenA(ADMIN_TOKENA, modifiedAccessToken);
    LocalStorageService.setTokenR(ADMIN_TOKENR, modifiedRefreshToken);
    LocalStorageService.setUserData(ADMIN_DATA, modifiedData);
    sessionStorage.setItem(ADMIN_ROLES, data.admin ? "ADMIN" : "SHOP");
  
    if (data.shop) {
      const shopId = data.shop._id;
  
      LocalStorageService.setUUID(ADMIN_UUID, shopId);
  
      handleGetOrderCount(shopId).then(response => {
        const {
          totalOrder,
          totalOrderPending,
          totalOrderConfirmed,
          totalOrderShipping,
          totalOrderCanceled,
          totalOderDelivered,
        } = response?.data.data;
  
        const str = `${totalOrder}T${totalOrderPending}T${totalOrderConfirmed}T${totalOrderShipping}T${totalOrderCanceled}T${totalOderDelivered}`;
        localStorage.setItem("totalUser", str);
        localStorage.setItem("initialDataFetched", "true");
      });
    }
  };
  

  const navigateToHome = () => {
    navigate("/home", { replace: true });
    window.location.reload();
  };

  const handleInvalidRole = () => {
    toast.error("You don't have permission to use this feature!");
    setPassword("");
    setUsername("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (submitButtonDisabled) {
      return; //
    }

    if (!username) {
      setErrorUsername(true);
    } else if (!password) {
      setErrorPassword(true);
    } else {
      try {
        setSubmitButtonDisabled(true);
        const [responseAdmin, responseShop] = await axios.all([
          handleLoginAdmin(username, password),
          handleLoginShop(username, password),
        ]);

        if (responseAdmin?.status == 200) {
          await handleAdminLogin(responseAdmin);
        } else if (responseShop?.status == 200) {
          // console.log(responseShop.data.data);
          await handleShopLogin(responseShop);
        } else {
          toast.error("Incorrect username or password!");
        }
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setSubmitButtonDisabled(false);
      }
    }
  };

  const handleRedirect = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.loginBox}>
          <div className={styles.content}>
            <h1 className={styles.title}>Welcome to DeliFood System! 👋 </h1>
            <div className={styles.form}>
              <div className={styles.username}>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  id="login-phone"
                  className={styles.loginInput}
                  placeholder="delifood@gmail.com"
                  aria-invalid="false"
                />
                {errorUsername && (
                  <span className={styles.error}>Invalid Email!</span>
                )}
              </div>
              <div className={styles.password}>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  id="login-password"
                  className={styles.loginInput}
                  placeholder="*********"
                  aria-describedby="login-password"
                  aria-invalid="false"
                />
                {errorPassword && (
                  <span className={styles.error}>Password is empty!</span>
                )}
              </div>
              <div className={styles.buttonContainer}>
                {submitButtonDisabled ? (
                  <CircularProgress color="primary" size={30} />
                ) : (
                  <button
                    className={styles.loginButton}
                    disabled={submitButtonDisabled}
                    onClick={handleSubmit}
                  >
                    Log in
                  </button>
                )}
                {/*<button className="register-button" onClick={handleRedirect} >Register</button>*/}
              </div>
            </div>
          </div>

          <img src={"/phone.png"} alt="image" className={styles.image} />
        </div>

        {showModal && (
          <Modal
            open={showModal}
            onClose={handleRedirect}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Register onClose={handleRedirect} />
          </Modal>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
