import "@/components/add/Add.scss";
import { useState, useEffect, ChangeEvent } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { keyCode } from "@/utils/keyCode-utils";
import { validateFullName } from "@/utils/auth-utils";
import { useDispatch } from "react-redux";
import {
  SET_TOTAL_CATEGORY,
  actionSetTotalUsers,
} from "@/redux/action/user-action";
import { CircularProgress } from "@mui/material";
import { handleAddCategory, handleUpdateCategory } from "@/api/category";
import { convertBase64 } from "@/utils/convert-base64";

type Props = {
  slug: string;
  selectedRowData?: CategoryModel;
  isUpdated: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCategory = (props: Props) => {
  const [imageUrl, setImageUrl] = useState<string>(
    props.isUpdated ? props.selectedRowData?.category_image || "" : ""
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string>();
  const [name, setName] = useState<string>();
  const [type, setType] = useState<string>();

  // const handleOnBlur = () => {
  //   if (image != undefined) setImageUrl(image);
  // };
  const handleEnterKeyPress = (e?: React.KeyboardEvent<HTMLFormElement>) => {
    e?.preventDefault();
    handleSubmit(e as React.FormEvent<HTMLFormElement>);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      category_name: name,
      category_image: image,
      type,
    });
    
    if (
      !validateFullName(name!) &&
      !validateFullName(image!) &&
      !validateFullName(type!)
    ) {
      try {
        setIsLoading(true);
        const res: any =  await handleAddCategory({
              category_name: name,
              category_image: image,
              type,
            });
        if (res && res.data && res.data.status === 200) {
          toast.success(res.data.message);
          dispatch(actionSetTotalUsers(SET_TOTAL_CATEGORY, true));
        } else {
          let e = (
            <div>
              <h4>Error unable to add Category</h4>
              <p>Duplicate field value {name}</p>
            </div>
          );
          toast.error(e);
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
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name);

    if (name != undefined || image != undefined) {
      try {
        setIsLoading(true);
        const res: any = await handleUpdateCategory(
          props.selectedRowData!._id,
          { category_name: name, category_image: image }
        );
        if (res && res.data && res.data.status === 200) {
          toast.success(res.data.message);
          dispatch(actionSetTotalUsers(SET_TOTAL_CATEGORY, true));
        } else {
          let e = (
            <div>
              <h4>Error unable to add Category</h4>
              <p>Duplicate field value {name}</p>
            </div>
          );
          toast.error(e);
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
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  
    if (file) {
      try {
        const fileConvertbase64: string = await convertBase64(file);
        setImage(fileConvertbase64);
        // console.log(fileConvertbase64);
      } catch (error) {
        console.error('Error converting file to base64:', error);
      }
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
        <span
          className="close"
          onClick={() => {
            props.setOpen(false);
            props.setIsUpdated(false);
            setImageUrl("");
          }}
        >
          X
        </span>
        <h1>
          {props.isUpdated ? "Update" : "Add New"} {props.slug}
        </h1>
        {imageUrl && (
          <img
            src={imageUrl || props.selectedRowData?.category_image}
            alt=""
            width={60}
            height={60}
            style={{ borderRadius: 60 }}
          />
        )}
        <form onSubmit={props.isUpdated ? handleUpdate : handleSubmit}>
          <div className="item">
            <label>Image</label>
            <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
          </div>
          <div className="item">
            <label>Name</label>
            <input
              type={"string"}
              placeholder={
                props.isUpdated ? props.selectedRowData?.category_name : "Name"
              }
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {!props.isUpdated && (
            <div className="item">
              <label>Type</label>
              <input
                type={"string"}
                placeholder={"Type"}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
          )}
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

export default AddCategory;
