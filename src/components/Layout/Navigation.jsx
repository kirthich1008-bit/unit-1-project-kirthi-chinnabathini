import './Layout.css';
import { Link } from 'react-router';

const Navigation = () => {
    return(
        <nav>
            <ul className="navigation">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/childrenprofile">Children Profile</Link>
                </li>
                <li>
                    <Link to="/memories">Memories</Link>
                </li>
                <li>
                    <Link to="/milestones">Milestones</Link>
                </li>
                <li>
                    <Link to="/gallery">Gallery</Link>
                </li>
            </ul>
        </nav>
    );
};
export default Navigation;