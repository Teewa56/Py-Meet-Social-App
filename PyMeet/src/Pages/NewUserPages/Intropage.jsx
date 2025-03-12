import { Link } from 'react-router-dom';

const IntroPage = () => {
    return (
        <>
            <div className="body-intro flex flex-col justify-center items-center min-h-screen bg-black bg-opacity-50 text-white">
                <div className="header flex flex-col items-center mb-8">
                    <>
                        <img src="/images/py-logo.jpg" alt="Logo" className="mb-4"/>
                        <p className="text-6xl font-bold text-wheat font-calibri">PiMeet</p>
                    </>
                </div>
                <div className="mb-8">
                    <p className="text-center text-2xl">Connect With Family And Friends Like You Always Do</p>
                </div>
                <Link to="/SignUpPage" className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black py-3 px-8 rounded-full text-white text-2xl no-underline">
                    Get Started
                </Link>
            </div>
        </>
    );
};

export default IntroPage;
