import { useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import { LocalStorageService } from "@/service/local-storage-service";
import { decryptData } from "@/utils/crypto-utils";
import { useNavigate } from "react-router-dom";
import { ADMIN_DATA } from "@/service/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_TOTAL_USERS,
  SET_EXPANDED_MENU,
  actionSetTotalUsers,
} from "@/redux/action/user-action";
import { CLEAR_NEW_ORDER, receiveNewOrder } from "@/redux/action/order-action";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState<string>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const isExpandedMenu = useSelector((state:any)=>state.user.isExpandedMenu)
  const handleFetchData = () => {
    const token = LocalStorageService.getUserData(ADMIN_DATA);
    const myHash = decryptData(token);
    const jsonDecode = JSON.parse(myHash);

    let fullNameAdmin = jsonDecode?.f_name && jsonDecode?.l_name;
    if (fullNameAdmin == undefined) fullNameAdmin = jsonDecode?.name;
    else fullNameAdmin = `${jsonDecode.f_name} ${jsonDecode.l_name}`;

    setFullName(fullNameAdmin);
  };
  useEffect(() => {
    handleFetchData();
  }, []);

  const handleLogout = () => {
    LocalStorageService.removeAll();
    sessionStorage.clear()
    dispatch(actionSetTotalUsers(CLEAR_TOTAL_USERS));
    dispatch(receiveNewOrder(CLEAR_NEW_ORDER,undefined));

    navigate("/", { replace: true });
  };
  const handleSetExpanded = () => {
    dispatch(actionSetTotalUsers(SET_EXPANDED_MENU, !isExpandedMenu));
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="" width={32} height={32} />
        <span>DeliFood</span>
      </div>
      <div className={styles.icons}>
        {/* <img src="/search.svg" alt="" className={styles.icon} /> */}
        {/* <img src="/app.svg" alt="" className={styles.icon} /> */}
        <img
          src="/expand.svg"
          alt=""
          onClick={handleSetExpanded}
          className={styles.icon}
        />
        {/* <div className={styles.notification}>
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div> */}
        <div className={styles.user}>
          <img src="/noavatar.png" alt="" />
          <span>{fullName}</span>
        </div>
        {openModal && (
          <div className={styles.modalLogout} onClick={handleLogout}>
            <div className={styles.user}>
              <img src="/logout.svg" alt="" />
              <span style={{ color: "black" }}>Logout</span>
            </div>
          </div>
        )}
        <img
          src="/settings.svg"
          alt=""
          className={styles.icon}
          onClick={() => {
            setOpenModal(!openModal);
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
