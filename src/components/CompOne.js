import axios from 'axios'
import React,{memo,useMemo, useState} from 'react'
import './commonComp.scss'
const CompOne = ({setStep,callCode,setCallCode ,phone, setPhone}) => {

    const [cCode, setCCode] = useState([])
    const [errors, setErrors] = useState('')
    const [loading, setLoading] = useState(false)

    const getCallingCode = async()=>{
        try{
            let res = await axios.get('https://test.paplilabs.com/login_api/callingCode/?limit=249');
            //console.log(res)
            if(res.status === 200){
                setCCode(res.data.results)
            }
        }catch(err){
            console.log(err)
        }
    }

    useMemo(()=>{
        getCallingCode()
    },[])


    const checkNumber = async()=>{
        if(!callCode || !phone){
            return setErrors('Calling Code and Phone Number is required')
        }else if(phone.length !== 10){
            return setErrors('Phone number should be of 10 digits')
        }else{
            setErrors('')
        }
        setLoading(true)
       // console.log(callCode,phone)
        try{
            let res = await axios.post('https://test.paplilabs.com/login_api/validatePhNum/',{phone_number:'+'+callCode+phone});
            //console.log(res)
            if(res.data.user_exist === "False"){
                setStep(1)
            }else{
                setLoading(false)
                return setErrors('Phone number already exists, try new one.')
            }
        }catch(err){
            setLoading(false)
            console.log(err)
        }
        setLoading(false)
    }

    return (
        <>
        <div className='comp-div'>
            {/* ---heading--- */}
        <h1 className='text-center mb-1 mt-4'>Welcome!</h1>
        <h6 className='text-center mb-3'>Let's get you started with a free Account.</h6>
        {/* ------heading ends----- */}
            <div className='bg-light w-100 p-5'>
                <p className='text-center mb-3'>Lets get started by entering you <b>phone number</b></p>
            
            <div className='d-flex justify-content-between align-items-center'>
<div className='d-fex'>
    +
<select className="select-code bg-light" value={callCode} onChange={e=>setCallCode(e.target.value)}>
  <option selected>91</option>
  {!cCode.length &&
    <option disabled>loading...</option>
  }
  {cCode?.sort((a,b)=> a.calling_code - b.calling_code).map((item)=>(
<option key={item.name}>{item.calling_code}</option>
  ))}
</select>
</div>
<input type='number' className='num-inp bg-light' value={phone} onChange={e=>setPhone(e.target.value)} placeholder="8887776662"/>
            </div>

            {errors &&
            <p className='text-danger text-center my-4'>{errors}</p>
            }
            
            </div>
            
        </div>
        <div className='btn continue-btn' onClick={checkNumber} disabled={loading}>
            {loading ?
            <>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span className="visually-hidden">Loading...</span>    
        </>
        :
        "Continue"
        }
        </div>
        </>
    )
}

export default memo(CompOne)
