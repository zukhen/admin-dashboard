import { ADMIN_ROLES } from "@/service/constant";
import styles from "./chartBox.module.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  color: string;
  icon: string;
  title: string;
  titleForShop?: string;
  dataKey: string;
  number: number | string;
  percentage: number;
  chartData: object[];
  total?: number | string;
};

const ChartBox = (props: Props) => {
  const storedRolesString = sessionStorage.getItem(ADMIN_ROLES);

  return (
    <div className={styles.chartBox}>
      <div className={styles.boxInfo}>
        <div className={styles.title}>
          <img src={props.icon} alt="" />
          <span>
            {storedRolesString == "SHOP" ? props.titleForShop : props.title}
          </span>
        </div>
        <h1>{props.total}</h1>
        {/* <Link to="/" style={{ color: props.color }}>
          View all
        </Link> */}
      </div>
      <div className={styles.chartInfo}>
        <div className={styles.chart}>
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.texts}>
          <span
            className={styles.percentage}
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {props.percentage}%
          </span>
          <span className={styles.duration}>this month</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
