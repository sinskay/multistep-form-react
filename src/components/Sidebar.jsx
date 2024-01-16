import { useEffect } from "react";
import PropTypes from 'prop-types';



export default function Sidebar({currentStep}) {



    useEffect(()=>{

        const steps = document.querySelectorAll(".stepN");
        
        
        for(let i=0;i<steps.length;i++){

            if(parseInt(steps[i].innerText) === currentStep){
                steps[i].classList.add("activeStep");
            }else {
                steps[i].classList.remove("activeStep");
            }
        }
    },[])



    return ( 
        <div className="sidebar">
            <div className="step">
                    <span className="stepN">1</span>
                    <div className="stepInfo">
                        <p>STEP 1</p>
                        <p>YOUR INFO</p>
                    </div>        
            </div>
            <div className="step">
                    <span className="stepN">2</span>
                    <div className="stepInfo">
                        <p>STEP 2</p>
                        <p>SELECT PLAN</p>
                    </div>        
            </div>
            <div className="step">
                    <span className="stepN">3</span>
                    <div className="stepInfo">
                        <p>STEP 3</p>
                        <p>ADD-ONS</p>
                    </div>        
            </div>
            <div className="step">
                    <span className="stepN">4</span>
                    <div className="stepInfo">
                        <p>STEP 4</p>
                        <p>SUMMARY</p>
                    </div>        
            </div>
        </div>
     );
}


Sidebar.propTypes = {
    currentStep: PropTypes.number
};