import { GridColDef } from "@mui/x-data-grid";
import { ChangeEvent, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { keyCode } from "@/utils/keyCode-utils";
import "@/components/add/Add.scss";
import {
  validateProductDescription,
  validateProductIsNumber,
  validateProductName,
} from "@/utils/auth-utils";
import { CircularProgress } from "@mui/material";
import { handleAddProduct } from "@/api/product";
import { handleQueryCategory } from "@/api/category";
import { useDispatch } from "react-redux";
import {
  SET_TOTAL_PRODUCT,
  actionSetTotalUsers,
} from "@/redux/action/user-action";
import { resizeFile} from "@/utils/convert-base64";

type Props = {
  slug?: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormData = {
  image: string;
  product_type: string;
  product_thumb: string;
  product_name: string;
  product_description: string;
  product_slug: string;
  product_price: number;
  product_quality: number;
  categoryId: string;
  product_attributes: {
    brand: string;
    size: string;
    ingredients: string;
    allergens: string;
    nutritionalValue: string;
    availability: "2023-12-04T10:00:00.000Z";
  };
};

type Category = {
  _id: string;
  category_name: string;
  category_position: number;
  category_priority: number;
  category_image: string;
  createdAt: string;
  updatedAt: string;
};

const Add = (props: Props) => {
  const dispatch = useDispatch();

  const totalUserFromStorage = localStorage.getItem("totalProduct");
  const totalUserToShow = totalUserFromStorage ? totalUserFromStorage : "28";
  const [isLoading, setIsLoading] = useState(false);
  const [dataCategory, setDataCategory] = useState<Category[]>([]);
  const [formData, setFormData] = useState<FormData>({
    image: "",
    product_type: "Food",
    product_thumb: "",
    product_name: "",
    product_description: "",
    product_slug: "Phở",
    product_price: -1,
    product_quality: -1,
    categoryId: "",
    product_attributes: {
      brand: "Deli Food",
      size: "Lớn",
      ingredients: "Không",
      allergens: "Không",
      nutritionalValue: "Nhiều",
      availability: "2023-12-04T10:00:00.000Z",
    },
  });
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        let result:any= await resizeFile(file);
        setFormData({
          ...formData,
          image: result,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleEnterKeyPress = (e?: React.KeyboardEvent<HTMLFormElement>) => {
    e?.preventDefault();
    handleSubmit(e as React.FormEvent<HTMLFormElement>);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData.image);
    
    if (
      !validateProductName(formData.product_name) &&
      !validateProductDescription(formData.product_description) &&
      (validateProductIsNumber(formData.product_price) ||
        formData.product_price >= 0) &&
      (validateProductIsNumber(formData.product_quality) ||
        formData.product_quality >= 0) &&
      !validateProductName(formData.image)
    ) {
      try {
        formData.product_thumb = formData.image;
        setIsLoading(true);
        const res = await handleAddProduct(formData);
        if (res?.data.status == 201) {
          //public sản phẩm
          toast.success(res.data.message);
          dispatch(actionSetTotalUsers(SET_TOTAL_PRODUCT, true));
          //xoá cắt chim
          let calc = Number(totalUserToShow) + 1;

          localStorage.setItem("totalProduct", calc.toString());
        } else {
          toast.error("Error unable to add Product");
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
  const setCategory = (value: ChangeEvent<HTMLSelectElement>) => {
    formData.categoryId = value.target.value;
  };
  const getCategories = async () => {
    const categories: any = await handleQueryCategory(1, 10);
    setDataCategory(categories.data.data);
    formData.categoryId = categories.data.data[0]._id;
  };
  useEffect(() => {
    getCategories();
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
                {column.field === "image" ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    name={column.field}
                  />
                ) : column.field !== "categoryId" ? (
                  <input
                    type={column.type}
                    placeholder={column.field}
                    name={column.field}
                    onChange={handleInputChange}
                    min={0}
                  />
                ) : (
                  <select className="itemSelect" onChange={setCategory}>
                    {Array.isArray(dataCategory) ? (
                      dataCategory.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.category_name}
                        </option>
                      ))
                    ) : (
                      <option value={"default"}>Default</option>
                    )}
                  </select>
                )}
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
