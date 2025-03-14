import Posts from "../../Components/Posts";
import NewPostBtn from "../../Components/AddNewPostButton";

const PostsPage = () => {


    return(
        <div className="p-5">
            <h2 className="flex justify-start items-center"> 
                <p className="text-3xl font-bold">Hot</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="24" height="24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor">
                    <path d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z"></path>
                </svg>
            </h2>
            <Posts />
            <NewPostBtn />
        </div>
    )
}

export default PostsPage;