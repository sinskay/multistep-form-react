import Sidebar from "./Sidebar";
import Arcade from "/images/icon-arcade.svg"
import Advanced from "/images/icon-advanced.svg"
import Pro from "/images/icon-pro.svg"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { back, next } from "../store/appSlice";
import { motion } from "framer-motion";




export default function Form2() {

    const animatieObj = useSelector((state)=>state.step.animations)


    const [isValid,setIsValid] = useState(false)

    const dispatch = useDispatch();

    const handleBack = ()=>{
        dispatch(back());
    }

    const handleNext = ()=>{
        dispatch(next());
    }

    const handlePromotion = (e)=>{

        const switchElement = e.currentTarget;

        const plan = document.querySelectorAll('.plan');
        const yearPlanPromotion = document.querySelectorAll('.yearPlanPromotion');
        const planPrice = document.querySelectorAll(".planPrice");


        
        // unClick the selected plan when change the billing type
        setIsValid(false)

        document.querySelectorAll(".plan").forEach((el)=>{
            el.classList.remove("selectedPlan");
        })

        if(switchElement.checked){
            
            document.getElementById("yearlyPlan").classList.add("activeBilling");
            document.getElementById("monthlyPlan").classList.remove("activeBilling");
            

            planPrice[0].innerText = "$90/yr";
            planPrice[1].innerText = "$120/yr";
            planPrice[2].innerText = "$150/yr";
            plan.forEach((el)=>{
                el.style.cssText = "height: 190px;";
            })
            yearPlanPromotion.forEach((el)=>{
                el.style.cssText = "opacity: 1;visibility: visible;";
            })
            
        }else {
            document.getElementById("monthlyPlan").classList.add("activeBilling");
            document.getElementById("yearlyPlan").classList.remove("activeBilling");
            
            planPrice[0].innerText = "$9/mo";
            planPrice[1].innerText = "$12/mo";
            planPrice[2].innerText = "$15/mo";
            plan.forEach((el)=>{
                el.style.cssText = "height: 170px;";
            })
            yearPlanPromotion.forEach((el)=>{
                el.style.cssText = "transition: none;opacity: 0;visibility: hidden;";
            })
            
        }
    }


    const handlePlan = (e)=>{

        const planObj = {
            planName: "",
            planPrice: "",
            billingType: ""
        }
        

        document.querySelectorAll(".plan").forEach((el)=>{
            el.classList.remove("selectedPlan");
        })
        
        e.currentTarget.classList.toggle("selectedPlan");

        const SelectedPlanName = e.currentTarget.children[1].children[0].innerText;
        const SelectedPlanPrice = e.currentTarget.children[1].children[1].innerText;

        

        planObj.planName = SelectedPlanName;
        planObj.planPrice = SelectedPlanPrice;
        let shortNameBilling = planObj.planPrice.substring(planObj.planPrice.length - 2);
        if(shortNameBilling === "yr"){
            planObj.billingType = "yearly";
        }else {
            planObj.billingType = "monthly";
        }


        setIsValid(true);
        
        
        localStorage.setItem("planInfo", JSON.stringify(planObj));
        console.log(JSON.parse(localStorage.getItem("planInfo")));
        
    }



    return ( 

        <div className="container formContainer">
            <Sidebar currentStep={2}/>
            <motion.div className="formN"
            variants={animatieObj}
            initial="hidden"
            animate="visible"
            >

                <div className="formInfo">
                    <h1 className="formTitle">Select your plan</h1>
                    <p className="formDescription">
                        You have the option of monthly or yearly billing
                    </p>
                </div>

                <div className="plans">

                    <div className="plan" onClick={handlePlan}>
                        <img src={Arcade} alt="plan icon"/>
                        <div>
                            <p className="planName">Arcade</p>
                            <p className="planPrice">$9/mo</p>
                            <p className="yearPlanPromotion">2 months free</p>
                        </div>
                    </div>
                    <div className="plan" onClick={handlePlan}>
                        <img src={Advanced} alt="plan icon"/>
                        <div>
                            <p className="planName">Advanced</p>
                            <p className="planPrice">$12/mo</p>
                            <p className="yearPlanPromotion">2 months free</p>
                        </div>
                    </div>
                    <div className="plan" onClick={handlePlan}>
                        <img src={Pro} alt="plan icon"/>
                        <div>
                            <p className="planName">Pro</p>
                            <p className="planPrice">$15/mo</p>
                            <p className="yearPlanPromotion">2 months free</p>
                        </div>
                    </div>
                    
                </div>
                <div className="switchPlan">       

                    <span id="monthlyPlan" className="activeBilling">Monthly</span>    
                    <div className="form-check form-switch">
                        <input  onClick={handlePromotion} className="form-check-input" type="checkbox" role="switch" id="switchBilling"/>
                    </div>
                    <span id="yearlyPlan">Yearly</span>   

                </div>
                <button className="backBtn" onClick={handleBack}>
                        Go Back
                </button>
                <button className="nextBtn" disabled={!isValid} onClick={handleNext}>
                    Next Step
                </button>
            </motion.div>

        </div>


     );
}