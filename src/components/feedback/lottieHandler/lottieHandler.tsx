import Lottie from "lottie-react";
import notFound from "@assets/lottiesFile/notFound.json";
import loading from "@assets/lottiesFile/loading.json";
import empty from "@assets/lottiesFile/empty.json";
import error from "@assets/lottiesFile/error.json";
import { Container } from "react-bootstrap";

type LottieHandlerProps = {
    type: keyof typeof lottieTypes;
    message?: string;
    style?: React.CSSProperties;
}
const lottieTypes = {
    notFound,
    loading,
    empty,
    error,
}

export default function LottieHandler({ type, message }: LottieHandlerProps) {
    return (
        <Container className="d-flex flex-column align-items-center justify-content-center">
        <Lottie animationData={lottieTypes[type]} loop={true} style={{ width: "500px"}} />
            <p className=" mt-5 text-center">{message}</p>
            </Container>

    )

};