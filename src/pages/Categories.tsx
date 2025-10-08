import Category from "@components/ecommerce/Category/category";
import { Col, Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { thunkGetCategories } from "@store/categories/categoriesSlice";
import { useEffect } from "react";


const Categories = () => {
    const dispatch = useAppDispatch();
    const { records, loading, error } = useAppSelector((state) => state.categories);


    useEffect(() => {
        if(!records.length){
        dispatch(thunkGetCategories());
        }
    }, [dispatch , records]);

    const categoriesList = records.length > 0 ? records.map((record) => 
    
        <Col xs={3} key={record.id} className="d-flex justify-content-center mb-5 mt-2">
            <Category {...record} />
        </Col>
      ) : "No categories found" ;



    return (
        <Container>
            <Row>{categoriesList}</Row> 
        </Container>
    )
}


export default Categories;