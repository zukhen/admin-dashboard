import { GridColDef } from "@mui/x-data-grid";
import { ChangeEvent, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { keyCode } from "@/utils/keyCode-utils";
import { addNewShop } from "@/api/shop";
import "@/components/add/Add.scss";
import {
  validateFullName,
  validateMobileNumber,
  validateUsername,
} from "@/utils/auth-utils";
import { useDispatch } from "react-redux";
import {
  SET_TOTAL_USERS,
  actionSetTotalUsers,
} from "@/redux/action/user-action";
import { CircularProgress } from "@mui/material";
import { splitTotalString } from "@/utils/modifield-string";
import { handleAddAddress } from "@/api/address";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormData = {
  name: string;
  msisdn: string;
  email: string;
  password: string;
  address: string;
};

const Add = (props: Props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const totalUserFromStorage = localStorage.getItem("totalUser");
  const totalUserToShow = totalUserFromStorage ? totalUserFromStorage : "12T8";
  const [formData, setFormData] = useState<FormData>({
    name: "",
    msisdn: "",
    email: "",
    password: "",
    address: "",
  });
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleEnterKeyPress = (e?: React.KeyboardEvent<HTMLFormElement>) => {
    e?.preventDefault();
    handleSubmit(e as React.FormEvent<HTMLFormElement>);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !validateFullName(formData.name) &&
      !validateMobileNumber(formData.msisdn) &&
      !validateUsername(formData.email) &&
      !validateFullName(formData.address) &&
      formData.password.length > 8
    ) {
      try {
        setIsLoading(true);
        const res = await addNewShop(formData);
        if (res?.data.status == 201) {
          console.log(res.data);
          let shopId = res.data.data.shop._id
          const resAddress = await handleAddAddress(shopId,formData.address);
          if (resAddress?.status == 200) {
            toast.success(res.data.message);
            dispatch(actionSetTotalUsers(SET_TOTAL_USERS, true));
            //xoá cắt chim
            let calc =
              Number(splitTotalString(totalUserToShow.toString())[0]) + 1;

            localStorage.setItem("totalUser", calc.toString());
          }else{
            toast.error("Error when add Address");

          }
          // window.location.reload();
        } else {
          toast.error("Error unable to add Shop");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        props.setOpen(false);
      }
    } else {
      toast.error("Please do not leave any fields blank");
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case keyCode.ESCAPE:
          props.setOpen(false);
          break;
        case keyCode.ENTER:
          handleEnterKeyPress();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add New {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column, index) => (
              <div className="item" key={index}>
                <label>{column.headerName}</label>
                <input
                  type={column.type}
                  placeholder={column.field}
                  name={column.field}
                  style={{ width: column.field == "address" ? "500px" : "" }}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          {!isLoading ? <button>Send</button> : null}
        </form>
        {isLoading ? (
          <div className="loadingContainer">
            <CircularProgress color="primary" size={30} />
            <p>Loading...</p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Add;
