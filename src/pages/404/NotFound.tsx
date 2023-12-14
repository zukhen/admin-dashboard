import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
export default function NotFoundPage() {
    const navigate = useNavigate()
  return (
    <div className={styles.bgPurple}>
      <div className={styles.stars}>
        <div className={styles.centralBody}>
          <img
            className={styles.image404}
            src="http://salehriaz.com/404Page/img/404.svg"
            width="300px"
            alt="404"
          />
         <button
            className={styles.btnGoHome}
            onClick={()=>navigate(-1)}
            rel="noopener noreferrer"
          >
            GO BACK HOME
          </button>
        </div>
        <div className={styles.objects}>
          <img
            className={styles.objectRocket}
            src="http://salehriaz.com/404Page/img/rocket.svg"
            width="40px"
            alt="Rocket"
          />
          <div className={styles.earthMoon}>
            <img
              className={styles.objectEarth}
              src="http://salehriaz.com/404Page/img/earth.svg"
              width="100px"
              alt="Earth"
            />
            <img
              className={styles.objectMoon}
              src="http://salehriaz.com/404Page/img/moon.svg"
              width="80px"
              alt="Moon"
            />
          </div>
          <div className={styles.boxAstronaut}>
            <img
              className={styles.objectAstronaut}
              src="http://salehriaz.com/404Page/img/astronaut.svg"
              width="140px"
              alt="Astronaut"
            />
          </div>
        </div>
        <div className={styles.glowingStars}>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
        </div>
      </div>
    </div>
  );
}
