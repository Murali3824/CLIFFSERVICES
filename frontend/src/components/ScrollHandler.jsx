import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollHandler = () => {
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash.replace("#", "");
        if (hash) {
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100); // Small delay to ensure DOM is fully rendered
        } else {
            // Ensure we always scroll to top when no hash is present
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [location]); // Ensure this runs every time the location changes

    return null;
};

export default ScrollHandler;
