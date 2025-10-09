import type { TLoading } from "../../../types/Loading";

type LoadingProps = {
    children: React.ReactNode;
} & TLoading;

const Loading = ({ status, error, children }: LoadingProps) => {
    if (status === "pending") {
        return <div>loading please wait</div>;
    }
    if (status === "failed") {
        return <div>{error}</div>;
    }
         
           
                return<>{children}</>;
         
}      
           
   


export default Loading;