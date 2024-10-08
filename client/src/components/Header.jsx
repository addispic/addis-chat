import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {NavLink} from 'react-router-dom'

// slices
// user
import {userSelector,logout} from '../features/users/users.slice'

// components
// username
import Username from '../pages/user/user-sub-pages/Username'
// user profile
import UserProfile from '../pages/user/user-sub-pages/UserProfile'

const Header = () => {
  // dispatch
  const dispatch = useDispatch();
  // states from slices
  // user
  const user = useSelector(userSelector);
  return (
    <header className='h-[7vh] bg-green-500 text-white w-full'>
      {/* container */}
      <div className='container-max-width flex items-center justify-between h-full'>
        {/* logo */}
        <div>logo</div>
        {/* search */}
        <div>search</div>
        {/* actions */}
        <div>
          {
            user 
            ?
            <div className='flex items-center justify-end gap-x-3'>
              {/* profile */}
              <div className='w-[28px] aspect-square rounded-full overflow-hidden'>
                <UserProfile />
              </div>
              {/* username */}
              <div className='text-sm'>
                <Username _id={user?._id}/>
              </div>
              {/* notification */}
              <div>
                <span>notification</span>
              </div>
              {/* logout button */}
              <div>
                <button className='px-3 py-0.5 rounded-sm bg-white text-green-500 text-sm transition-colors ease-in-out duration-150 hover:bg-gray-50' onClick={()=>{
                  dispatch(logout());
                }}>Logout</button>
              </div>
            </div>
            :
            <div className='flex items-center gap-x-3 justify-end'>
              <NavLink className={'px-3 py-0.5 rounded-sm bg-white text-green-500 text-sm transition-colors ease-in-out duration-150 hover:bg-gray-50'} to={"/user/login"}>Login</NavLink>
              <NavLink className={'px-3 py-0.5 rounded-sm bg-white text-green-500 text-sm transition-colors ease-in-out duration-150 hover:bg-gray-50'} to={"/user/register"}>Register</NavLink>
            </div>
          }
        </div>
      </div>
    </header>
  )
}

export default Header