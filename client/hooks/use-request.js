import axios from 'axios'
import { useState } from 'react'


/** 
 * Hook to return configured Axios object
 * If defined -> calls onSuccess on res.data
 * Simple user Alert error handing
 * 
 * @param {string} url
 * @param {string} method
 * @param {Object} body
 * @param {Function} onSuccess
 * 
 * */ 

const useRequest = ({url, method, body, onSuccess}) => {
    const [errors, setErrors] = useState(null)

    const doRequest = async () => {
        try {
            setErrors(null)
            const res = await axios[method](url, body)
            onSuccess&&onSuccess(res.data)
            return res.data
        } catch (err) {
            setErrors(
                (<div className="alert alert-danger">
                    <h4>Ooops</h4>
                    <ul className="my-0">
                        {err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
                    </ul>
                </div>)
            )
        }
    }

    return { doRequest, errors }
}

export default useRequest