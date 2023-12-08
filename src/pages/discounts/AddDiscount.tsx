// import { GridColDef } from "@mui/x-data-grid";
// import styles from "../../components/add/Add.scss";
// import { ChangeEvent, useState, useEffect } from "react";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
// import { keyCode } from "@/utils/keyCode-utils";
// import {
//     validateFullName,
//     validateIsNumber,
// } from "@/utils/auth-utils";
// import { useDispatch } from "react-redux";
// import {
//     SET_TOTAL_USERS,
//     actionSetTotalUsers,
// } from "@/redux/action/user-action";
// import { CircularProgress } from "@mui/material";
// type Props = {
//     slug: string;
//     columns: GridColDef[];
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };
// type FormData = {
//     name: string;
//     price: string;
//     quantity: string;
//     endTime: string;
// };

// const Add = (props: Props) => {
//     const dispatch = useDispatch();
//     const listError = [
//         "Invalid name",
//         "Invalid price",
//         "Invalid quantity",
//         "Invalid end time",
//     ];
//     const [checkError, setCheckError] = useState([false, false, false, false]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [formData, setFormData] = useState<FormData>({
//         name: "",
//         price: "",
//         quantity: "",
//         endTime: "",
//     });
//     const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = event.target;

//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };
//     const handleEnterKeyPress = (e?: React.KeyboardEvent<HTMLFormElement>) => {
//         e?.preventDefault();
//         handleSubmit(e as React.FormEvent<HTMLFormElement>);
//     };
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         let newCheckError = [...checkError];
//         if (validateFullName(formData.name)) {
//             newCheckError[0] = true;
//         } else {
//             newCheckError[0] = false;
//         }
//         if (!validateIsNumber.test(formData.price)) {
//             newCheckError[1] = true;
//         } else {
//             newCheckError[1] = false;
//         }
//         if (!validateIsNumber.test(formData.quantity)) {
//             newCheckError[2] = true;
//         } else {
//             newCheckError[2] = false;
//         }
//         if (formData.endTime == '') {
//             newCheckError[3] = true;
//         } else {
//             newCheckError[3] = false;
//         }
//         setCheckError(newCheckError);

//         if (
//             !newCheckError[0] &&
//             !newCheckError[1] &&
//             !newCheckError[2] &&
//             !newCheckError[3]
//         ) {
//             console.log(formData);
            
//             // try {
//             //     setIsLoading(true);
//             //     const res = await addNewShop(formData);
//             //     if (res?.data.status == 201) {
//             //         toast.success(res.data.message);
//             //         // dispatch(actionSetTotalUsers(SET_TOTAL_USERS, true));
//             //         //xoá cắt chim
//             //         // window.location.reload();
//             //     } else {
//             //         toast.error("Lỗi không thêm được mã giảm giá");
//             //     }
//             // } catch (error) {
//             //     console.log(error);
//             // } finally {
//             //     setIsLoading(false);
//             //     props.setOpen(false);
//             // }
//         }
//     };

//     useEffect(() => {
//         const handleKeyPress = (event: KeyboardEvent) => {
//             switch (event.key) {
//                 case keyCode.ESCAPE:
//                     props.setOpen(false);
//                     break;
//                 case keyCode.ENTER:
//                     handleEnterKeyPress();
//                     break;
//                 default:
//                     break;
//             }
//         };

//         document.addEventListener("keydown", handleKeyPress);

//         return () => {
//             document.removeEventListener("keydown", handleKeyPress);
//         };
//     }, []);

//     return (
//         <div className={styles.add}>
//             <div className={styles.modal}>
//                 <span className={styles.close} onClick={() => props.setOpen(false)}>
//                     X
//                 </span>
//                 <h1>Add New Discount</h1>
//                 <form onSubmit={handleSubmit}>
//                     {props.columns
//                         .filter((item) => item.field !== "id" && item.field !== "img")
//                         .map((column, index) => (
//                             <div className={styles.item} key={column.field}>
//                                 <label>{column.headerName}</label>
//                                 <input
//                                     type={column.type}
//                                     placeholder={column.field}
//                                     name={column.field}
//                                     onChange={handleInputChange}
//                                 />
//                                 <span className={styles.error}>
//                                     {checkError[index] ? listError[index] : ""}
//                                 </span>
//                             </div>
//                         ))}
//                     {!isLoading ? <button>Send</button> : null}
//                 </form>
//                 {isLoading ? (
//                     <div className={styles.loadingContainer}>
//                         <CircularProgress color="primary" size={30} />
//                         <p>Loading...</p>
//                     </div>
//                 ) : (
//                     <div></div>
//                 )}
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default Add;
