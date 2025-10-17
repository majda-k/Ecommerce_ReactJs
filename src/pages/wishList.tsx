
import Product from "@components/ecommerce/Product/product";
import type { TProduct } from "../types/Product";
import GridList from "@components/common/GridList/GridList";

import useWishLIst from "@hooks/useWishLIst";





export default function WishList() {
   
  
    const { records, loading, error } = useWishLIst();



    return (
        <div className="wishList"> 
            <h1> Your WishList</h1>
            <div >
                <GridList records={records} gridItem={(record : TProduct) => <Product {...record} />} />
            </div>
          
            
            
        </div>
    )
}