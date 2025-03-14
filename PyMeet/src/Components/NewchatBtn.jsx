import { Link } from 'react-router-dom';

const NewchatBtn = () => {

    return(
        <div className='bg-transparent absolute bottom-20 right-10' >
           <Link to='/NewChatPage' >
                <button className='bg-blue text-white text-2xl p-3 border rounded-full '>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2" stroke="white">
                        <path d="M12 5l0 14"></path>
                        <path d="M5 12l14 0"></path>
                    </svg>
                </button>   
            </Link>
        </div>
    )
}

export default NewchatBtn;