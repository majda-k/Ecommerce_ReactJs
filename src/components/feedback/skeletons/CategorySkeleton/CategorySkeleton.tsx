import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

export default function CartSkeleton(props: React.ComponentProps<typeof ContentLoader>) {


    const renderSkeleton = Array(4).fill(0).map((_, index) => (
        <Col xs={3} key={index} className="d-flex justify-content-center mt-5">
                  
            <ContentLoader
                speed={2}
                width={200}
                height={209}
                viewBox="0 0 200 150"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                {...props}
            >
                <rect x="35" y="142" rx="3" ry="3" width="88" height="9" />
                <circle cx="88" cy="68" r="68" />
            </ContentLoader>
            </Col>

       
    ));
    return <Row>{renderSkeleton}</Row>

}