import React,{memo} from 'react'
import './pills.scss'

const Pills = ({mark,text,color}) => {
    return (
        <div className='text-center pills-div' style={{border:`2px solid ${mark ? 'blue' : 'red'}`}}>
            <div className='d-flex justify-content-center'>
                {mark &&
                <p style={{color:`${mark ? 'blue' : 'red'}`}} className="pt-1"><i className="fas fa-check"></i></p>
                }
                <p style={{color:`${mark ? 'blue' : 'red'}`}} className="pt-1">{text}</p>
            </div>
            
        </div>
    )
}

export default memo(Pills)
