import ContentLoader from "react-content-loader";
import { Col, Row } from "react-bootstrap";


const ProductSkeleton = (props: React.ComponentProps<typeof ContentLoader>) => {
    const renderSkeleton = Array(4).fill(0).map((_, index) => (
            <Col xs={3} key={index} className="d-flex justify-content-center ">
            <ContentLoader 
        speed={2}
        width={400}
        height={460}
        viewBox="0 0 400 460"
        backgroundColor="#e0e0e0"
        foregroundColor="#ecebeb"
        {...props}
      >
        <rect x="44" y="65" rx="2" ry="2" width="130" height="200" /> 
        <rect x="43" y="279" rx="0" ry="0" width="130" height="24" /> 
        <rect x="43" y="313" rx="0" ry="0" width="131" height="24" /> 
        <rect x="41" y="346" rx="0" ry="0" width="134" height="23" /> 
        <rect x="53" y="384" rx="0" ry="0" width="111" height="38" />
      </ContentLoader>
      </Col>
    ));
    return <Row>{renderSkeleton}</Row>
}

export default ProductSkeleton;