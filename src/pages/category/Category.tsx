import Single from "@/components/single/Single";
import { singleProduct } from "@/data";


export default function Shop() {
  return (
    <div>
      <Single {...singleProduct}/>
    </div>
  )
}
