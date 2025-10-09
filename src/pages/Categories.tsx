import Category from "@components/ecommerce/Category/category";
import { Col, Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { thunkGetCategories } from "@store/categories/categoriesSlice";
import { useEffect } from "react";
import Loading  from "@components/feedback/loading/loading";
import GridList from "@components/common/GridList/GridList";
import type { TCategory } from "../types/Category";


const Categories = () => {
    const dispatch = useAppDispatch();
    const { records, loading, error } = useAppSelector((state) => state.categories);


    useEffect(() => {
        if(!records.length){
        dispatch(thunkGetCategories());
        }
    }, [dispatch , records]);

    // const categoriesList = records.length > 0 ? records.map((record) => 
    
    //     <Col xs={3} key={record.id} className="d-flex justify-content-center mb-5 mt-2">
    //         <Category {...record} />
    //     </Col>
    //   ) : "No categories found" ;



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