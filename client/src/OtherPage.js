import {Link} from "react-router-dom";

const OtherPage = () => {

    return (
        <div>
            I'm on other page!
            <Link to="/"> Go back to home page</Link>
        </div>
    );
};

export default OtherPage;