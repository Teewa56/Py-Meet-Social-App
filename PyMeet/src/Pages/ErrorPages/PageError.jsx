import { Link } from "react-router-dom";

const PageError = () =>{

    return(
        <div className="h-screen flex items-center justify-center">
            <div className="text-center h-1/2 text-red-200 ">  
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-15">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <h1 className="text-3xl text-red ">Page not found!</h1>
                <div className="mt-5 flex items-center justify-center"> 
                <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default PageError;