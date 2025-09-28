import { useEffect, useState } from "react"
import {getUserData} from "../https"
import { removeUser, setUser } from "../redux/slice/userSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const useLoadData = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const {data} = await getUserData()
                console.log(data)

                const {_id, name, email, phone, role} = data.data
                dispatch(setUser({_id, name, email, phone, role}))
            } catch (error) {
                dispatch(removeUser())
                navigate("/auth")
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUser()
    }, [dispatch, navigate])

    return isLoading
}

export default useLoadData