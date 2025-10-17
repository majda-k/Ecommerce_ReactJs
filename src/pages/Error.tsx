import { Container } from "react-bootstrap";
import  "@/styles/global.css";
import LottieHandler from "@components/feedback/lottieHandler/lottieHandler";
import { Link } from "react-router-dom";



export default function Error() {
  

    return (
        <Container className="notFound d-flex flex-column align-items-center justify-content-center mt-auto">
    <LottieHandler type="notFound"  message="Page not found" />
    <Link to="/" replace={true}>How about going back to safety?</Link>
    </Container>
    );
}