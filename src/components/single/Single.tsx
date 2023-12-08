
import styles from  "./single.module.scss";

type Props = {
  _id?: string;
  f_name?: string;
  l_name?: string;
  email?: string;
  phone?: string;
  img?: string;
  name?:string
  activities?: { text?: string, time?: string }[]
};
  
const Single = (props: Props) => {
  
  return (
    <div className={styles.single}>
      <div className={styles.view}>
        <div className={styles.info}>
          <div className={styles.topInfo}>
            <img src={props.img || '/noavatar.png'} alt="" />
            <h1>{`${props.f_name ?? props.l_name ?? props.name}`}</h1>
            <button>Update</button>
          </div>
          <div className={styles.details}>
          <div className={styles.item} >
                <span className={styles.itemTitle}>{props.email}</span>
                <span className={styles.itemValue}>{props?.phone}</span>
              </div>
            {/* {Object.entries(props.info).map((item) => (
              <div className="item" key={item[0]}>
                <span className="itemTitle">{item[0]}</span>
                <span className="itemValue">{item[1]}</span>
              </div>
            ))} */}
          </div>
        </div>
        <hr />
        {/* {props.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((dataKey) => (
                  <Line
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )} */}
      </div>
      <div className={styles.activities}>
        <h2>Latest Activities</h2>
        {props.activities != null ? <ul>
          {props.activities.map((activity) => (
            <li key={activity.text}>
              <div>
                <p>{activity.text}</p>
                <time>{activity.time}</time>
              </div>
            </li>
          ))}
        </ul> : <h3>No activity</h3>}
      </div>
    </div>
  );
};

export default Single;
