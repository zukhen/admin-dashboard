import Single from "@/components/single/Single"
import { singleProduct } from "@/data"


const Product = () => {
  //Fetch data and send to Single Component
  return (
    <div className="product">
       <Single _id={singleProduct.id.toString()}  email="" f_name="" l_name=""  phone=""   activities = {singleProduct.activities} img={singleProduct.img}   />
    </div>
  )
}

export default Product