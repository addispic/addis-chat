import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {NavLink} from 'react-router-dom'

// slices
// user
import {userSelector,logout, loggingOutSelector} from '../features/users/users.slice'

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
  // logging out
  const loggingOut = useSelector(loggingOutSelector)
  return (
    <header className='h-[7vh] bg-green-600 text-white w-full'>
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
                {
                  loggingOut
                  ?
                  <div className='w-[67.921px] flex items-center justify-center'>

                  <div className='w-[24px] aspect-square rounded-full border-4 border-white border-r-transparent animate-spin'></div>
                  </div>
                  :
                  <button id='bbb' className='px-3 py-0.5 rounded-sm bg-white text-green-500 text-sm transition-colors ease-in-out duration-150 hover:bg-gray-50' onClick={()=>{
                    dispatch(logout());
                    console.log(window.getComputedStyle(document.getElementById('bbb')).width)
                  }}>Logout</button>

                }
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