import { Link } from "react-router-dom";
import styles from "./menu.module.scss";
import { useEffect, useState } from "react";
import { ADMIN_ROLES } from "@/service/constant";
import { menu } from "@/data";
import { useSelector } from "react-redux";

interface MenuItem {
  id: number;
  title: string;
  url: string;
  icon: string;
  requiredRole?: string;
}

const Menu = () => {
  const [userData, setUserData] = useState<string>();
  const isExpandedMenu = useSelector((state: any) => state.user.isExpandedMenu);

  const handleFetchData = async () => {
    const storedRolesString = sessionStorage.getItem(ADMIN_ROLES);
    if (storedRolesString !== null) {
      setUserData(storedRolesString.toString());
    }
  };
  useEffect(() => {
    handleFetchData();
  }, []);

  const isUserInRole = (requiredRole: string | undefined) => {
    // check role
    return (
      requiredRole === undefined ||
      (userData && userData.includes(requiredRole))
    );
  };

  return (
    <div className={styles.menu}>
      {menu.map((item) => (
        <div className={styles.item} key={item.id}>
          <span className={styles.title}>
            {item.id == 2 && userData?.includes("SHOP") ? "Order" : item.title}
          </span>
          {item.listItems.map((listItem: MenuItem) =>
            isUserInRole(listItem.requiredRole) ? (
              <Link
                to={listItem.url}
                className={styles.listItem}
                key={listItem.id}
                title={listItem.title}
              >
                <img src={listItem.icon} alt={listItem.title} title={listItem.title} className={styles.icon}/>
                <span
                  className={styles.listItemTitle}
                  style={{
                    display: isExpandedMenu ? "none" : "flex",
                  }}
                  title="Expanded"
                >
                  {listItem.title}
                </span>
              </Link>
            ) : null
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
