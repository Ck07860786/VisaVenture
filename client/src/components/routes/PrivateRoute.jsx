import Spinner from '@/components/ui/shared/Spinner'
import { useUserAuth } from '@/context/userAuth'
import { BASE_URL } from '@/helper/Port'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function PrivateRoute() {

    const [ok,setOk] = useState(false)
    const [userAuth,setUserAuth]=useUserAuth()
    

    useEffect(()=>{
        const checkAuth = async()=>{
            const res = await axios.get(`${BASE_URL}/api/auth/user-auth`);
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
        }
        if(userAuth?.token) checkAuth()
    },[userAuth?.token])
  return ok ?<Outlet/> : <Spinner path='/login'/>
}



