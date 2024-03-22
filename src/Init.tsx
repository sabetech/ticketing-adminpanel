import Sidebar from './Pages/Layout/Sidebar';
import Login from './Pages/Auth/Login';
import { getUserInfo } from './Utils/Auth';

function Init() {   
  
    const userInfo = getUserInfo();

    console.log(userInfo);

    return (
        <>
            { userInfo ? <Sidebar userInfo={ userInfo }/> : <Login /> }
        </>
    )
}

export default Init;