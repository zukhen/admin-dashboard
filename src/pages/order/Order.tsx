import { useEffect, useState } from "react";
import { LocalStorageService } from "@/service/local-storage-service";
import { decryptData } from "@/utils/crypto-utils";
import Single from "@/components/single/Single";

const User = () => {
  //Fetch data and send to Single Component
  const [singleUser, setSingleUser] = useState<{
    _id?: string;
    f_name?: string;
    l_name?: string;
    email?: string;
    phone?: string;
    name?: string;
  }>();
  const handleFetchData = () => {
    const token = LocalStorageService.getUserData();
    const myHash = decryptData(token);

    setSingleUser(JSON.parse(myHash));
  };
  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div >
      <Single {...singleUser} />
    </div>
  );
};

export default User;
