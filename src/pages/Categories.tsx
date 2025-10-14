import Category from "@components/ecommerce/Category/category";
import { Col, Container, Row } from "react-bootstrap";
import Loading  from "@components/feedback/loading/loading";
import GridList from "@components/common/GridList/GridList";
import type { TCategory } from "../types/Category";
import useCategories from "@hooks/useCategories";


const Categories = () => {
const { records, loading, error } = useCategories();


    return (
        <Container>
            <h1 className="text-center mb-5">Categories</h1>
            <Loading status={loading} error={error} >
           <GridList records={records} gridItem={(record : TCategory) => <Category {...record} />} />
            </Loading>
            
        </Container>
    )
}


export default Categories;