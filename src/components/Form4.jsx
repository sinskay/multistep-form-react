import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch,useSelector } from "react-redux";
import { back, next } from "../store/appSlice";
import { motion } from "framer-motion";



export default function Form4() {

    const dispatch = useDispatch();
    const animateObj = useSelector((state)=>state.step.animations)


    const handleBack = ()=>{
        dispatch(back());
    }

    const handleConfirm = ()=>{
        dispatch(next());
    }

    const addAddon = (name,price)=>{
        const addons = document.querySelector(".chosedAddons");


        let chosedAddon = document.createElement("div");
        chosedAddon.className = "chosedAddon";

        let p1 = document.createElement("p");
        p1.className = "chosedAddonName";
        let p2 = document.createElement("p");
        p2.className = "chosedAddonPrice";

        p1.innerText =  name;
        p2.innerText =  price;

        chosedAddon.appendChild(p1);
        chosedAddon.appendChild(p2);

        addons.append(chosedAddon);
    }


    

    useEffect(()=>{
        let pricesText = [];
        let totalPrice = 0;

        const plan = document.querySelector(".chosedPlan");
        const chosedPlanPrice = document.querySelector(".chosedPlanPrice");
        const billing = document.querySelector(".chosedBilling");
        const summaryBilling = document.querySelector(".summaryBilling");


        const planInfo = JSON.parse(localStorage.getItem("planInfo"));
        plan.innerText = planInfo.planName;
        chosedPlanPrice.innerText = planInfo.planPrice;
        pricesText.push(planInfo.planPrice);
        billing.innerText = ` (${planInfo.billingType})`;
        summaryBilling.innerText = (planInfo.billingType === "monthly"?"month":"year");


        const addons = JSON.parse(localStorage.getItem("addons"));
        addons.map((addon)=>{
            addAddon(addon.addonName,addon.addonPrice);
            pricesText.push(addon.addonPrice);
        })


        pricesText.map((text)=>{
            let priceInt = text.match(/\d+(,\d{3})*(?:\.\d{1,2})?/);
            totalPrice += parseInt(priceInt[0]);
        })



        let short = "";
        if(planInfo.billingType==="monthly"){
            short = "mo";
        }else{
            short = "yr";
        }

        document.querySelector('.totalPrice').innerText = `+$${totalPrice}/${short}`;

    },[])


    






    return ( 

        <div className="container formContainer">
            
            <Sidebar currentStep={4}/>
            <motion.div className="formN"
            variants={animateObj}
            initial="hidden"
            animate="visible">

                <div className="formInfo">
                    <h1 className="formTitle">Finishinh up</h1>
                    <p className="formDescription">
                        Double-check everything looks OK before confirming.
                    </p>
                </div>


                <div className="summary">
                    <div className="summaryDetails">

                            <div className="summaryTop">
                                <div>
                                    <p>
                                        <span className="chosedPlan">Arcade</span>
                                        <span className="chosedBilling"> (Monthly)</span>
                                    </p>
                                    <p className="changePlan">Change</p>
                                </div>
                                <p className="chosedPlanPrice">$9/mo</p>
                            </div>
                            <hr />
                            <div className="chosedAddons">
                                
                            </div>
              
                    </div>
                    <div className="summaryTotal">
                        <p>Total (per <span className="summaryBilling">month</span>)</p>
                        <p className="totalPrice">+$12/mo</p>
                    </div>
                </div>



                







                <button className="backBtn" onClick={handleBack}>
                    Go Back
                </button>
                <button className="nextBtn confirm" onClick={handleConfirm}>
                    Confirm
                </button>
            </motion.div>

        </div>


     );
}