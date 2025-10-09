import { Col, Row } from "react-bootstrap";
import Category from "@components/ecommerce/Category/category";

 type GridListProps<T>={
    records : T[];
    gridItem : (record: T) => React.ReactNode;

}
type hasId = { id : number };

const GridList = <T extends hasId>({ records, gridItem }: GridListProps<T>) => {
   
   
        const categoriesList = records.length > 0 ? records.map((record) => 

            <Col xs={3} key={record.id} className="d-flex justify-content-center mb-5 mt-2">
                {gridItem(record)}
            </Col>
          ) : "No categories found";

    return (
        <Row>{categoriesList}</Row>
    )
}

export default GridList;