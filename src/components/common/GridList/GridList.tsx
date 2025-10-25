import { Col, Row } from "react-bootstrap";
import LottieHandler from "@components/feedback/lottieHandler/lottieHandler";


 type GridListProps<T>={
    records : T[];
    gridItem : (record: T) => React.ReactNode;
    emptyMessage : string;
}
type hasId = { id : number };

const GridList = <T extends hasId>({ records, gridItem, emptyMessage }: GridListProps<T>) => {

    if(records.length === 0){
        return <LottieHandler type="empty" message={emptyMessage} />;
    }
   
   
        const categoriesList = records.length > 0 ? records.map((record) => 

            <Col xs={3} key={record.id} className="d-flex justify-content-center mb-5">
                {gridItem(record)}
            </Col>
          ) : <LottieHandler type="empty" message={emptyMessage} />;

    return (
        <Row>{categoriesList}</Row>
    )
}

export default GridList;