import { useContext, useState } from "react";
import Loading from "../../Components/Loading";
import BackButton from "../../Components/BackButton";
import ProfilePreview from "../../Components/ProfilePreview";
import { UserContext } from "../../Context/userContext";
// this componenet renenders the error 
// when the user is offline and other errors
//also so many errors in here

const SearchPage = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState(null);
    const { loading, error, searchaUser } = useContext(UserContext);
    const [recents, setRecents] = useState(() => {
        const savedRecents = localStorage.getItem("recents");
        return savedRecents ? JSON.parse(savedRecents) : [];
    });

    
        const searchUser = async () => {
            if (search.trim() === "" || !search) return;
            try{
                const response = await searchaUser(search);
                setSearch(search);
                const data = await response.json();
                setResults(data.results);
                const updatedRecents = [search, ...recents.filter((item) => item !== search)].slice(0, 5);
                setRecents(updatedRecents);
                setSearch("");
                localStorage.setItem("recents", JSON.stringify(updatedRecents));
            }catch(error){
                console.log(error);
                setMessage(error.message);
            }
        };


    const handleRecentClick = (recent) => {
        setSearch(recent);
    };

    const handleRemoveRecent = (recent) => {
        const updatedRecents = recents.filter((item) => item !== recent);
        setRecents(updatedRecents);
        localStorage.setItem("recents", JSON.stringify(updatedRecents));
    };

    const handleClearRecents = () => {
        setRecents([]);
        localStorage.setIitem("recents", JSON.stringify(recents));
    };


    return (
        <div className="h-screen p-5">
            
            <div className="flex items-center justify-between mb-5 mt-12">
                <BackButton />
                <input
                    type="text"
                    className="w-4/5 p-2 border rounded-lg"
                    placeholder="Enter your search here"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <svg onClick={searchUser} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 " style={{cursor : "pointer"}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                
            </div>
            {message && <p>{message}</p> }
            {!recents && 
            <div className="flex justify-between items-center">
                <h3 className="text-3xl font-bold">Recents</h3>
                <button onClick={handleClearRecents} className="border-b-2 border-black text-red-400 p-2 ml-2">
                    Clear all
                </button>
            </div> }
            <div className="mb-5">
                {recents.length > 0 && (
                    <div className="flex flex-wrap">
                        {recents.map((recent, index) => (
                            <div key={index} className="flex items-center bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-1 m-1 rounded-lg">
                                <span onClick={() => handleRecentClick(recent)} className="cursor-pointer">
                                    {recent}
                                </span>
                                <svg onClick={() => handleRemoveRecent(recent)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {loading && <Loading />}

            {!results && <p className="text-center ">Nothing here yet</p>}

            {results.length > 0 ? (
                <div>
                    {results.map((result, id) => (
                        <ProfilePreview user={result.user} key={id} />
                    ))}
                </div>
            ) : (
                !loading && !results && <div className="text-center text-gray-500">No results found</div>
            )}

            {error && <div className="text-center text-red-500">{error.message}</div>}
        </div>
    );
};

export default SearchPage;
