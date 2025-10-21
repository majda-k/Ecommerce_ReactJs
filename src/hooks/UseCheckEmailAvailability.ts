import axios from "axios";

import { useState } from "react";


type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";

export default function useCheckEmailAvailability() {
    const [checkEmailAvailabilityStatus, setCheckEmailAvailabilityStatus] = useState<TStatus>("idle");

    const [enteredEmail, setEnteredEmail] = useState<null | string>(null);

    const checkEmailAvailability = async (email: string) => {
        setEnteredEmail(email);
        setCheckEmailAvailabilityStatus("checking");
        try {
            const response = await axios.get(`/users?email=${email}`);
            if(response.data.length > 0){
                setCheckEmailAvailabilityStatus("notAvailable");
            }else{
                setCheckEmailAvailabilityStatus("available");
            }
        } catch (error) {
            setCheckEmailAvailabilityStatus("failed");
        }
    }

    const resetCheckEmailAvailability = () => {
        setCheckEmailAvailabilityStatus("idle");
        setEnteredEmail(null);
    }


return {checkEmailAvailabilityStatus, enteredEmail, checkEmailAvailability ,resetCheckEmailAvailability};

}

