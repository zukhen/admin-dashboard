import styles from "./topBox.module.scss";
import { ADMIN_ROLES } from "@/service/constant";
import { useEffect, useState } from "react";
import { handleGetTopProduct } from "@/api/order";

import { ShimmerText, ShimmerCircularImage } from "react-shimmer-effects";
import { truncateName } from "@/utils/modifield-string";

const TopBox = () => {
  const storedRolesString = sessionStorage.getItem(ADMIN_ROLES);
  const flag = storedRolesString == "SHOP";
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listTopOrder, setListTopOrder] = useState<TopOrderItem[]>([]);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      // const response = flag?await handleGetTopOrder():await handleGetTopProduct();
      const response =await handleGetTopProduct();
      if (response?.status === 200) {
        console.log(response.data);
        setListTopOrder(response.data.data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={styles.topBox}>
      <h1>Top {flag ? "Deals" : "Selling Products"}</h1>
      <div className={styles.list}>
        {isLoading
          ? [0, 1, 2, 3, 4].map(() => {
              return (
                <div className={styles.listItem}>
                  <div className={styles.user}>
                    <ShimmerCircularImage size={45} />
                    <div className={styles.userTexts}>
                      <ShimmerText line={2} className={styles.shimmerTitle} />
                    </div>
                  </div>
                  <ShimmerText line={1} className={styles.shimmerAmount} />
                </div>
              ); // or undefined
            })
          : listTopOrder.map((product) => (
              <div className={styles.listItem} key={product._id}>
                <div className={styles.user}>
                  <img src={product.productInfo.image} alt="" />
                  <div className={styles.userTexts}>
                    <span className={styles.username}>
                      {product.productInfo.product_name}
                    </span>
                    <span className={styles.email}>
                      {truncateName(product.productInfo.product_description)}
                    </span>
                  </div>
                </div>
                <span className={styles.amount}>{product.totalQuantity}</span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TopBox;
