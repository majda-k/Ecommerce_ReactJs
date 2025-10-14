import { useAppDispatch, useAppSelector } from "@store/hooks";
import { thunkGetCategories } from "@store/categories/categoriesSlice";
import { useEffect } from "react";

export default function useCategories() {
    const dispatch = useAppDispatch();
    const { records, loading, error } = useAppSelector((state) => state.categories);


    useEffect(() => {
        if(!records.length){
        dispatch(thunkGetCategories());
        }
    }, [dispatch , records]);

    return { records, loading, error };
}

