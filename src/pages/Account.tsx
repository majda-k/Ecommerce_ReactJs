import { useAppSelector } from "@store/hooks";

export default function Account() {
    const { user } = useAppSelector((state) => state.auth);
    return (
        <div>
            <h4>Account Info</h4>
            <p>FirstName: {user?.firstName} </p>
            <p>Last Name: {user?.lastName}</p>
            <p>Email: {user?.email}</p>
        
        
        </div>
    )
}