import axios from 'axios'
import React,{memo,useEffect,useState} from 'react'
import './commonComp.scss'
import Pills from './pills/Pills'
const CompTwo = ({setStep,email,setEmail,password,setPassword,subscribed,setSubscribed}) => {

    const [errors, setErrors] = useState('')
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    //for pills ---------------------------
    const [caps,setCaps] = useState(false)
    const [special,setSpecial] = useState(false)
    const [lower,setLower] = useState(false)
    const [nums,setNums] = useState(false)
    //-------------------------------------
    //email check
    const [emailV,setEmailV] = useState(false)
    //------------------------------------

function checkPassword(str){
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return re.test(str);
}

const checkPasswordValidity = (value) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
        setErrors("Password must not contain Whitespaces.")
        
    }else if(isNonWhiteSpace.test(value)){
        setErrors("")
    }
  
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
        setErrors("Password must have at least one Uppercase Character.")
        setCaps(false)
    }else if(isContainsUppercase.test(value)){
        setCaps(true)
    }
  
    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
        setErrors("Password must have at least one Lowercase Character.")
        setLower(false)
    }else if(isContainsLowercase.test(value)){
        setLower(true)
    }
  
    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
        setErrors("Password must contain at least one Digit.")
        setNums(false)
    }else if(isContainsNumber.test(value)){
        setNums(true)
    }
  
    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) {
        setErrors("Password must contain at least one Special Symbol.")
        setSpecial(false)
    }else if(isContainsSymbol.test(value)){
        setSpecial(true)
    }
  
    // const isValidLength = /^.{6,16}$/;
    // if (!isValidLength.test(value)) {
    //     setErrors("Password must be 10-16 Characters Long.")
    // }else if(isValidLength.test(value)){
    //     setErrors("")
    // }
}

useEffect(()=>{
    if(password.length){
        checkPasswordValidity(password)
    }else{
        return
    }
        
},[password])

//for password field
    const toggle = ()=>{
        if(visible){
            setVisible(false)
        }else{
            setVisible(true)
        }
    }

//main function
    const checkEmail = async()=>{
        if(!email || !password){
            return setErrors('Email and Password is required')
        }
        if (!checkPassword(password)){
            return setErrors('Password should be atleast of 6 character having below fields checked')
        }else{
            setErrors('')
        }
        setLoading(true)
        try{
            let res = await axios.post('https://test.paplilabs.com/login_api/validateEmail/',{email:email});
            //console.log(res)
            if(res.data.success === "False"){
                setLoading(false)
                setEmailV(false)
                return setErrors('Invalid Email.')
            }else{
                setEmailV(true)
                let resTwo = await axios.post('https://test.paplilabs.com/user/validateEmail/',{email:email});
                //console.log(resTwo)
                if(resTwo.data.user_exist !== "False"){
                setLoading(false)
                return setErrors('User with this email already exists.')
                }else{
                    //setErrors("yeppi")
                    setLoading(false)
                    setStep(2)
                }
            }
        }catch(err){
            setLoading(false)
            console.log(err)
        }
        setLoading(false)
    }
// console.log(subscribed)
    return (
        <>
        <div className='comp-div'>
            {/* ---heading--- */}
        <h1 className='text-center mb-1 mt-4'>Welcome!</h1>
        <h6 className='text-center mb-3'>Let's get you started with a free Account.</h6>
        {/* ------heading ends----- */}
        <p className='text-center mb-3'>We suggest using email address that you use at work.</p>
            <div className='bg-light w-100 p-5'>   

            <label>Email</label>
<div class="input-group mb-3">
<input type='email' className='txt-inp' value={email} onChange={e=>setEmail(e.target.value)} placeholder="enter email..."/>
  <span class={`input-group-text ${emailV ? 'text-primary' : 'text-secondary'} bg-light side-btn`} id="basic-addon2"><i className="fas fa-check-circle"></i></span>
</div>

<label>Password</label>
<div class="input-group mb-3">
<input type={visible ? 'text' : 'password'} className='txt-inp' value={password} onChange={e=>setPassword(e.target.value)} placeholder="enter password..."/>
  <span class={`input-group-text ${visible ? 'text-primary' : 'text-secondary'} bg-light side-btn`} id="basic-addon2" onClick={toggle}><i className="fas fa-eye"></i></span>
</div>

<div className='row'>
    <div className='col-md-4 mb-1'>
        <Pills color='red' text="capital&nbsp;letter" mark={caps}/>
    </div>
    <div className='col-md-4 mb-1'>
        <Pills color='red' text="special&nbsp;character" mark={special}/>
    </div>
    <div className='col-md-4 mb-1'>
        <Pills color='red' text="lowercase&nbsp;letter" mark={lower}/>
    </div>
    <div className='col-md-3 mb-1'>
        <Pills color='red' text="numbers" mark={nums}/>
    </div>
</div>

            {errors &&
            <p className='text-danger text-center my-4'>{errors}</p>
            }
            
            </div>
            <div className='d-flex justify-content-center'>
            <input type='checkbox' className='mt-1 mx-2 check-box' checked={subscribed} onChange={e=>setSubscribed(e.target.checked)}/>
            <p className='text-center'>It's okay to send me emails about Novae Avenue</p>
            </div>
            
            
        </div>
        <div className='btn continue-btn' onClick={checkEmail} disabled={loading}>
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

export default memo(CompTwo)
