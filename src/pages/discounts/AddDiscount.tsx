import { GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { keyCode } from "@/utils/keyCode-utils";
import { CircularProgress } from "@mui/material";
import { handleGetAllProduct } from "@/api/product";
import styles from "./discounts.module.scss";
import { handleAddDiscount } from "@/api/discount";
type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
interface Product {
  _id: string;
  product_name: string;
}
const Add = (props: Props) => {
  // const listError = [
  //     "Invalid name",
  //     "Invalid price",
  //     "Invalid quantity",
  //     "Invalid end time",
  // ];
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const totalDiscountFromStorage = localStorage.getItem("totalDiscount");

  const [product, setProduct] = useState<Product>();
  const [discountValue, setDiscountValue] = useState(0);
  const [maxUse, setMaxuse] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleEnterKeyPress = (e?: React.KeyboardEvent<HTMLFormElement>) => {
    e?.preventDefault();
    handleSubmit(e as React.FormEvent<HTMLFormElement>);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // let newCheckError = [...checkError];
    // if (validateFullName(formData.name)) {
    //     newCheckError[0] = true;
    // } else {
    //     newCheckError[0] = false;
    // }
    // if (!validateIsNumber.test(formData.price)) {
    //     newCheckError[1] = true;
    // } else {
    //     newCheckError[1] = false;
    // }
    // if (!validateIsNumber.test(formData.quantity)) {
    //     newCheckError[2] = true;
    // } else {
    //     newCheckError[2] = false;
    // }
    // if (formData.endTime == '') {
    //     newCheckError[3] = true;
    // } else {
    //     newCheckError[3] = false;
    // }
    // setCheckError(newCheckError);

    // if (
    //     !newCheckError[0] &&
    //     !newCheckError[1] &&
    //     !newCheckError[2] &&
    //     !newCheckError[3]
    // ) {
    try {
      setIsLoading(true);
      let body = {
        code: "ABC123",
        start_date: startDate + " 00:00:00",
        end_date: endDate + " 00:00:00",
        is_active: true,
        min_order_value: 0,
        product_ids: product?._id ?? "6524f73420290b341e3253e0",
        applies_to: "all",
        name: name,
        description: description,
        type: "FoodOfAdmin",
        users_used: [],
        value: discountValue,
        max_value: discountValue,
        max_users: maxUse,
        users_count: 0,
        max_uses_per_user: 1,
      };

      let res = await handleAddDiscount(body);
      console.log(res);
      if (res?.data.status == 200) {
        toast.success(res.data.message);
        let calc = Number(totalDiscountFromStorage) + 1;
        localStorage.setItem("totalDiscount", calc.toString());

        // dispatch(actionSetTotalUsers(SET_TOTAL_USERS, true));
        //xoá cắt chim
        // window.location.reload();
      } else {
        toast.error("Lỗi không thêm được mã giảm giá");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
      props.setOpen(false)
    }
  };

  const getAllProduct = async () => {
    const res = await handleGetAllProduct();
    setListProducts(res?.data.data);
  };

  useEffect(() => {
    getAllProduct();
  }, []);

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
          <div style={{ }}>
            <div style={{width:'100%'}}>
              <h4>Discount's name: </h4>
              <input
                placeholder={"Name"}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <h4>Discount's description: </h4>
              <input
                placeholder={"description"}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div style={{ flexDirection: "row" }}>
            <div style={{ marginBottom: 6 }}>
              <h4>For product: </h4>
              <div style={{ height: 3 }}></div>
              <select
                style={{ width: 200, height: 35 }}
                onChange={(item) =>
                  setProduct({
                    _id: item.target.value,
                    product_name: item.target.value,
                  })
                }
              >
                {listProducts.length != 0 ? (
                  listProducts.map((item) => (
                    <option value={item._id}>{item.product_name}</option>
                  ))
                ) : (
                  <option value={"123"}>default</option>
                )}
              </select>
            </div>
            <div>
              <h4>Discount(%): </h4>
              <input
                placeholder={"10"}
                onChange={(e) => setDiscountValue(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div style={{ flexDirection: "row", width: "100%" }}>
            <div style={{ marginBottom: 6 }}>
              <h4>Max use: </h4>
              <input
                placeholder={"50"}
                onChange={(e) => setMaxuse(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className={styles.dateInputsContainer}>
            <div>
              <h4>Start date: </h4>
              <input
                className={styles.input}
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <h4>End date: </h4>
              <input
                className={styles.input}
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

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
