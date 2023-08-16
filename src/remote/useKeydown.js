import { useEffect } from "react";
import check_key from "./keys";

function useKeydown (props) {
    useEffect(() => {

        let timeout = null;

        const handleKeydown = (e) => {
            let key = check_key(e);
            if (props[key]) props[key](e);
        };

        if (props.isActive) {
            window.addEventListener("keydown", handleKeydown);
        } else {
            // console.log("useKeydown cleanup");
            window.removeEventListener("keydown", handleKeydown);
        }

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("keydown", handleKeydown);
        };

    }, [props]);
}

export default useKeydown;