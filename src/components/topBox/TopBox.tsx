import { topDealUsers } from "@/data"
import styles from "./topBox.module.scss"

const TopBox = () => {
  return (
    <div className={styles.topBox}>
      <h1>Top Deals</h1>
      <div className={styles.list}>
        {topDealUsers.map(user=>(
          <div className={styles.listItem} key={user.id}>
            <div className={styles.user}>
              <img src={user.img} alt="" />
              <div className={styles.userTexts}>
                <span className={styles.username}>{user.username}</span>
                <span className={styles.email}>{user.email}</span>
              </div>
            </div>
            <span className={styles.amount}>${user.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBox