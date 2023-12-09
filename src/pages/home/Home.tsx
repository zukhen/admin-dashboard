import TopBox from "@/components/topBox/TopBox";
import ChartBox from "@/components/chartBox/ChartBox";
import BigChartBox from "@/components/bigChartBox/BigChartBox";
import BarChartBox from "@/components/barChartBox/BarChartBox";
import {
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "@/data";
import styles from "./home.module.scss";
import { useEffect } from "react";
import { handleGetProductCount } from "@/api/product";
import { handleGetUserCount } from "@/api/user";
import { splitTotalString } from "@/utils/modifield-string";
import { useSelector } from "react-redux";
import { ADMIN_ROLES, ADMIN_UUID } from "@/service/constant";
import { handleGetOrderCount } from "@/api/order";

const Home = () => {
  const totalProductFromStorage = localStorage.getItem("totalProduct");
  const initialDataFetched = localStorage.getItem("initialDataFetched");

  const totalUserFromStorage = localStorage.getItem("totalUser");
  const totalUserToShow = totalUserFromStorage
    ? totalUserFromStorage
    : "0T0T0T0T0T0";
  const actionUser = useSelector((state: any) => state.user.isAddNewUser);
  const storedRolesString = sessionStorage.getItem(ADMIN_ROLES);

  const handleFetchApi = async () => {
    if (storedRolesString == "SHOP") {
      //get the total order count
      let idshop = localStorage.getItem(ADMIN_UUID);
      if (idshop != undefined) {
        const response = await handleGetOrderCount(idshop);
        const {
          totalOrder,
          totalOrderPending,
          totalOrderConfirmed,
          totalOrderShipping,
          totalOrderCanceled,
          totalOderDelivered,
        } = response?.data.data;
        let str = `${totalOrder}T${totalOrderPending}T${totalOrderConfirmed}T${totalOrderShipping}T${totalOrderCanceled}T${totalOderDelivered}`;
        localStorage.setItem("totalUser", str.toString());
      }
    } else {
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
    }
  };

  useEffect(() => {
    if (!initialDataFetched || actionUser) {
      handleFetchApi();
    }
  }, [actionUser]);

  return (
    <div className={styles.home}>
      <div className={[styles.box, styles.box1].join(" ")}>
        {/* top deal */}
        <TopBox />
      </div>
      <div className={[styles.box, styles.box2].join(" ")}>
        {/* get from redux */}
        <ChartBox
          {...chartBoxUser}
          total={Number(splitTotalString(totalUserToShow.toString())[0])}
        />
      </div>
      <div className={[styles.box, styles.box3].join(" ")}>
        {/* get from redux  enhance user experience */}
        <ChartBox
          {...chartBoxProduct}
          total={Number(splitTotalString(totalUserToShow.toString())[1])}
        />
      </div>
      {/* <div className="box box4">
        <PieChartBox />
      </div> */}
      <div className={[styles.box, styles.box5].join(" ")}>
        <ChartBox
          {...chartBoxConversion}
          total={
            storedRolesString == "SHOP"
              ? Number(splitTotalString(totalUserToShow.toString())[3])
              : Number(totalProductFromStorage) 
          }
        />
      </div>
      <div className={[styles.box, styles.box6].join(" ")}>
        <ChartBox
          {...chartBoxRevenue}
          total={
            storedRolesString == "SHOP"
            ? Number(splitTotalString(totalUserToShow.toString())[3])
            : Number(totalProductFromStorage) 
          }
        />
      </div>
      <div className={[styles.box, styles.box7].join(" ")}>
        <BigChartBox />
      </div>
      <div className={[styles.box, styles.box8].join(" ")}>
        <BarChartBox {...barChartBoxVisit} />
      </div>
      {/* <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div> */}
    </div>
  );
};

export default Home;
