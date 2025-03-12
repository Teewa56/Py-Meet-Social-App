import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const ToggleTheme = () => {

    const { toggleTheme } = useContext(ThemeContext);

    return(
        <button onClick={toggleTheme}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" className="size-6">
                <path d="M16 9a3 3 0 1 1 -3 3l.005 -.176a3 3 0 0 1 2.995 -2.824"></path>
                <path d="M16 5a7 7 0 0 1 0 14h-8a7 7 0 0 1 0 -14zm0 2h-8a5 5 0 1 0 0 10h8a5 5 0 0 0 0 -10"></path>
            </svg>
        </button>
    )
}

export default ToggleTheme;