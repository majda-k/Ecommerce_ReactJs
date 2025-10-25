
import Product from "@components/ecommerce/Product/product";
import type { TProduct } from "../types/Product";
import GridList from "@components/common/GridList/GridList";

import useWishLIst from "@hooks/useWishLIst";
import LottieHandler from "@components/feedback/lottieHandler/lottieHandler";





export default function WishList() {
   
  
    const { records, loading, error  } = useWishLIst();



    return (
        <div className="wishList"> 
            <h1> Your WishList</h1>
            <div >
                {records.length > 0 ? (
                    <GridList records={records} gridItem={(record : TProduct) => <Product {...record} />} 
                emptyMessage={"No products in wishlist"} />
                )
                : (<LottieHandler type="empty" message={"No products in wishlist"} />
                )}
            </div>
          
            
            
        </div>
    )
}