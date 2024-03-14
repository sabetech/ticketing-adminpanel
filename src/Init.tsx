import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import Sidebar from './Pages/Layout/Sidebar';
import Login from './Pages/Auth/Login';

function Init() {   
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            { isAuthenticated() ? <Sidebar /> : <Login /> }
        </>
    )
}

export default Init;