import axios from 'axios'
import React,{memo,useState,useMemo,useEffect} from 'react'
import './commonComp.scss'

const CompFour = ({setStep,state,setState,country,setCountry,pin,setPin,latitude,setLatitude,longitude,setLongitude}) => {

    const [errors, setErrors] = useState('')
    const [countryData, setCountryData] = useState([])
    const [stateData, setStateData] = useState([])

//for getting country data
    const getCountries = async()=>{
        try{
            let res = await axios.get('https://test.paplilabs.com/login_api/country/?limit=230');
            console.log(res)
            if(res.status === 200){
                setCountryData(res.data.results)
            }
        }catch(err){
            console.log(err)
        }
    }

    const getStates = async()=>{
        try{
            let res = await axios.get(`https://test.paplilabs.com/login_api/state/${country.slice(-2)}/`);
            console.log(res)
            if(res.status === 200){
                setStateData(res.data)
            }
        }catch(err){
            console.log(err)
        }
    }

const getInfos = async() =>{
    const params = {
        access_key: `${process.env.REACT_APP_GEO && process.env.REACT_APP_GEO}`,
        query: `${state && state}`
      }
      //https://api.positionstack.com/v1/forward
     await axios.get(`/api`, {params})
      .then(response => {
        console.log(response)
        const infos = Object.values(response.data)
        //console.log('infos',infos[0][0])
        setLatitude(infos[0][0].latitude)
        setLongitude(infos[0][0].longitude)
        setPin(infos[0][0].postal_code || 100000)//since geolocation api is not givingg pin of all
      }).catch(error => {
        console.log(error);
      });     
}
    
    useMemo(()=>{
        getCountries()
    },[])


    useEffect(()=>{
getStates()
    },[country])

    useEffect(()=>{
        getInfos()
    },[state])

//main function
    const checkField = async()=>{
        if(!country || !state || !pin || !latitude || !longitude){
            return setErrors('Please select proper Country and State')
        }else{
            setErrors("")
            setStep(4)
        }
    }
    //console.log('country',country.slice(0,-5))

    return (
        <>
        <div className='comp-div'>
            {/* ---heading--- */}
        <h2 className='text-center mb-1 mt-4'>Allow us, to get your location so we can set up map for you.</h2>
        {/* ------heading ends----- */}

            <div className='bg-light w-100 p-5'>   

            <label>Country</label>
<div class="mb-5">
<input list="countries" name="allCountries" className='txt-inp-full' value={country} onChange={e=>setCountry(e.target.value)}/>
<datalist id="countries" className='full-list'>
    {countryData?.map((item)=>(
        <option key={item.code}>{item.name} - {item.code}</option>
    ))}
</datalist>
</div>

<label>State</label>
<div class="mb-5">
<input list="states" name="allstates" className='txt-inp-full' value={state} onChange={e=>setState(e.target.value)} disabled={!country}/>
<datalist id="states" className='full-list' disabled={!country}>
    {stateData?.map((item)=>(
        <option key={item.region}>{item.region}</option>
    ))}
</datalist>
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

export default memo(CompFour)
