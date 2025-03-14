import { useEffect, useState } from "react";
import { allPosts } from "../Services/api";
import Loading from "../Components/Loading";
import Post from "./Post";

const Posts = () =>{

    const [posts, setposts ] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fecthAllposts = async () => {
            setLoading(true);
            try {
                const res = await allPosts();
                setposts(res.data);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fecthAllposts();
    },[])

    if(loading) return <Loading />

    return(
        <>
            <div >  
                {posts.length !== 0 ? 
                ( <div>
                    {posts.map((post) => 
                        <div key={post._id}>
                            <Post post={post} />
                        </div>
                    )}
                </div> ) : 
                (<div className="h-20 flex items-center justify-center">
                    <p>No posts yet</p>
                </div>)}
            </div>
            
        </>
    )
}

export default Posts;