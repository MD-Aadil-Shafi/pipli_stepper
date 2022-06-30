import axios from 'axios'
import React,{memo,useState} from 'react'
import './commonComp.scss'

const CompThree = ({setStep,firstName,setFirstName,lastName,setLastName}) => {

    const [errors, setErrors] = useState('')

//main function
    const checkField = async()=>{
        if(!firstName || !lastName){
            return setErrors('First name and Last name is required')
        }else{
            setErrors("")
            setStep(3)
        }
    }

    return (
        <>
        <div className='comp-div'>
            {/* ---heading--- */}
        <h2 className='text-center mb-1 mt-4'>Alright, let's set this up! Tell us a bit about yourself.</h2>
        {/* ------heading ends----- */}

            <div className='bg-light w-100 p-5'>   

            <label>First name</label>
<div class="mb-5">
<input type='text' className='txt-inp-full' value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="first name..."/>
</div>
<label>Last name</label>
<div class="mb-3">
<input type='text' className='txt-inp-full' value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="last name..."/>
</div>



            {errors &&
            <p className='text-danger text-center my-4'>{errors}</p>
            }
            
            </div>

            
        </div>
        <div className='btn continue-btn' onClick={checkField}>
            Continue
        </div>
        </>
    )
}

export default memo(CompThree)
