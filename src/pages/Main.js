import React, { useState } from 'react'
import './main.scss'
import Stepper from 'react-stepper-horizontal';
import CompOne from '../components/CompOne';
import Footer from '../components/footer/Footer';
import CompTwo from '../components/CompTwo';
import CompThree from '../components/CompThree';
import CompFour from '../components/CompFour';
import axios from 'axios';

const Main = () => {
    const [step, setStep] = useState(0)
    const [callCode,setCallCode] = useState(91)
    const [phone,setPhone] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [subscribed, setSubscribed] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLasttName] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [pin, setPin] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    
    //for this page api call
    const [loading,setLoading] = useState(false)
    const [errors, setErrors] = useState('')
    const [success, setSuccess] =  useState(false)
    const [msg, setMsg] = useState('')


    const handleBackController = ()=>{
        if(step > 0){
            setStep(step - 1)
        }
    }


    const handleSubmit = async()=>{
        let newData = {
            email:email,
            password:password,
            profile: {
                   first_name: firstName,
                   last_name: lastName,
                   phone_number: "+"+callCode+phone,
                   user_type: "I",
                   country:country.slice(0,-5),
                   state:state,
                   pin_code : Number(pin),
                   cordinate_X : latitude,
                   cordinate_Y : longitude,
            },
           device: {
               platform : "ANR",
               dev_id       :"fOJF2n04Q62MHy2i9rAGLs:APA91bHBUYJVPMk8_eKOSm15xcN6Istx4WenBTB1g_fFZ4qnC50VSTds4-a0R3ThGnqBlqTtDcsqdXCydxLGT-PJowMZ8Me3O1-NtzCNKiYmwJrEYliWsPv_RpG-ExcZpycKW9xUlXAB"
            }
           }

           console.log(newData)
           setLoading(true)

           try{
            let res = await axios.post('https://test.paplilabs.com/login_api/signup/',newData)
            console.log(res)
            if(res.data.success === 'True'){
                setSuccess(true)
                setErrors("")
                setMsg(`${res.data.message}`)
            }
           }catch(err){
            setLoading(false)
            console.log(err)
            setErrors(`${err.response.data}`)
           }
           
           setLoading(false)
    }

    return (
        <>
        <div className='d-flex justify-content-between px-2 bg-light title-flex'>
            <div className='d-flex py-2'>
                {step > 0 && !success &&
                <h1 className='text-secondary back-arrow' onClick={handleBackController}><i className="fas fa-arrow-left"></i></h1>
                }
                <h1 className='fw-light'>Novae Avenue</h1>
            </div>
            
            <div className='stepper-div'>
         <Stepper
         activeColor="#000"
         completeColor="#000"
         steps={ [step === 0 && {title: 'Phone Number'},step === 1 && {title: 'User Email'},step === 2 && {title: 'Name'},step === 3 && {title: 'Location'}] } 
         activeStep={ step } />   
        
        </div>
        </div>
        

        {/* -----components--- */}
        {step === 0 &&
        <CompOne step={step} setStep={setStep} callCode={callCode} setCallCode={setCallCode} phone={phone} setPhone={setPhone}/>
        }
        {step === 1 &&
        <CompTwo step={step} setStep={setStep} email={email} setEmail={setEmail} password={password} setPassword={setPassword} subscribed={subscribed} setSubscribed={setSubscribed}/>
        }
        {step === 2 &&
        <CompThree step={step} setStep={setStep} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLasttName}/>
        }
        {step === 3 &&
        <CompFour step={step} setStep={setStep} state={state} setState={setState} country={country} setCountry={setCountry} pin={pin} setPin={setPin} latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude}/>
        }
        {/* -----components-ends--- */}

        {step === 4 &&
        <>
        {errors &&
        <p className='text-danger text-center my-4'>{errors}</p>
}
{msg &&
        <p className='text-success fw-bold text-center my-4'>{msg}</p>
}
{!success ?
    <div className='btn continue-btn my-5' onClick={handleSubmit} disabled={loading}>
          {loading ?
          <>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span className="visually-hidden">Loading...</span>    
      </>
      :
      "Submit"
      }
      </div>
      :
      <div className='btn continue-btn my-5' onClick={()=>window.location.reload()}>
            Register Another User.
      </div>
}
          {/* <div className='btn continue-btn my-5' onClick={handleSubmit} disabled={loading}>
          {loading ?
          <>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span className="visually-hidden">Loading...</span>    
      </>
      :
      "Submit"
      }
      </div> */}
      </>
        }

<Footer/>
        </>
    )
}

export default Main
