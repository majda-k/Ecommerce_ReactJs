import type { TLoading } from "../../../types/Loading";
import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import LottieHandler from "../lottieHandler/lottieHandler";
import TableSkeleton from "../skeletons/TableSkeleton/tableSkeleton";

type LoadingProps = {
    children: React.ReactNode;
    type?: keyof  typeof  skeletonsTypes;
} & TLoading;


const skeletonsTypes={
    prduct : ProductSkeleton,
    category : CategorySkeleton,
    cart    : CartSkeleton,
    table   : TableSkeleton,
}

const Loading = ({ status, error, children, type = "category" }: LoadingProps) => {

    const Component = skeletonsTypes[type];
    
    if (status === "pending") {
        return <Component/>;
    }
    if (status === "failed") {
        return <LottieHandler type="error" message={error || "An error occurred"} />;
    }
         
           
                return<>{children}</>;
         
}      
           
   


export default Loading;