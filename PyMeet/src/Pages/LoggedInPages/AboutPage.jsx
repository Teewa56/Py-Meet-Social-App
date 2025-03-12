import BackButton from '../../Components/BackButton';

const AboutPage = () => {
    return (
        <>
        <BackButton />
        <div className="h-screen flex flex-col items-center justify-center py-8 px-4">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">About PyMeet</h3>
                <div className="text-gray-700 leading-relaxed mb-6">
                    <p>PyMeet is a revolutionary social media platform designed to connect people across the globe. With PyMeet, you can:</p>
                    <ul className="list-disc list-inside mt-2">
                        <li>Share updates, photos, and videos with your friends and followers.</li>
                        <li>Discover new friends and communities based on your interests.</li>
                        <li>Engage in meaningful conversations and stay informed about the latest trends.</li>
                    </ul>
                    <p className="mt-4">Our mission is to create a space where everyone can express themselves freely and connect with like-minded individuals. Join PyMeet today and be part of a vibrant and inclusive community!</p>
                </div>
                <p className="text-gray-500 text-sm text-center">
                    &copy; {new Date().getFullYear()} PyMeet. All rights reserved.
                </p>
            </div>
        </div>
        </>
    );
};

export default AboutPage;
