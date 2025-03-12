import Loading from '../../Components/Loading';
import BackButton from '../../Components/BackButton';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const DeleteAccount = () => {
    const Navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.user_.id || user._id;
    const { deleteAccount, loading, error } = useContext(AuthContext);

    if(loading) return <Loading />

    return (
        <>
            {error && 
            <div>
                <p>{error}</p>
            </div> }
            <div>
                <div>
                    <BackButton />
                    <h3>Delete Account</h3>
                </div>
                <p>Are you sure you want to delete this account,
                    deleting this account means you wont be able to retrieve you messages and 
                    also past activities on this app.
                </p>
                <button onClick={deleteAccount(userId)}>Delete Account</button>
                <button onClick={()=>Navigate("/")}>Back to home</button>
            </div>
        </>
    );
};

export default DeleteAccount;