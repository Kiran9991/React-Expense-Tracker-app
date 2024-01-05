
import VerifyEmail from '../verification/VerifyEmail';
import './Home.css';

const Home = () => {
    return (
        <div className="homeh2">
            <h2>Welcome to Expense Tracker!!!</h2>
            <div>
                <VerifyEmail/>
            </div>
        </div>
    )
}

export default Home;