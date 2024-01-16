import Sidebar from "./Sidebar";
import { useDispatch,useSelector } from "react-redux";
import { back, next } from "../store/appSlice";
import { motion } from "framer-motion";

export default function Form3() {

    const dispatch = useDispatch();
    const animatieObj = useSelector((state)=>state.step.animations)
    let addonsSelected = [];


    const billingType = JSON.parse(localStorage.getItem("planInfo")).billingType;

    const handleBack = ()=>{
        dispatch(back());
    }

    const handleAddons = ()=>{
        localStorage.setItem('addons',JSON.stringify(addonsSelected));
        dispatch(next());
    }
    
    const handleAddon = (e)=>{
        
        const addonObj = {
            addonName: e.currentTarget.children[1].children[0].innerText,
            addonPrice: e.currentTarget.children[2].innerText
        }

        if(addonsSelected.length === 0){
            addonsSelected.push(addonObj);   
        }else {

            const isExists = addonsSelected.some(obj => obj.addonName === addonObj.addonName);
            if(isExists){
                const indexToRemove = addonsSelected.findIndex(obj => obj.addonName === addonObj.addonName);
                if (indexToRemove !== -1) {
                    addonsSelected.splice(indexToRemove, 1);
                }

            }else {
                addonsSelected.push(addonObj)
            }
        }

        console.log(addonsSelected)
        e.currentTarget.classList.toggle("selectedAddon");
        const input = e.currentTarget.children[0];
        input.checked = !input.checked;
    }





    return ( 

        <div className="container formContainer">            
            <Sidebar currentStep={3}/>


            <motion.div className="formN"
              variants={animatieObj}
              initial="hidden"
              animate="visible"
            >

                <div className="formInfo">
                    <h1 className="formTitle">Pick add-ons</h1>
                    <p className="formDescription">
                        Add-ons help enhance your gaming experience
                    </p>
                </div>


                <div className="addons">
                    <div className="addon" onClick={handleAddon}>
                        
                        <input className="form-check-input addonCheck" type="checkbox"/>
                        <div>
                            <p className="addonName">Online service</p>
                            <p className="addDescription">Access to  multiplayer games</p>
                        </div>
                        <p className="addonPrice">
                            {billingType === "monthly" ? "+$1/mo" : "+$10/yr"}
                            
                        </p>



                    </div>
                    <div className="addon" onClick={handleAddon}>
                        <input className="form-check-input addonCheck" type="checkbox" />
                        <div>
                            <p className="addonName">Larger storage</p>
                            <p className="addDescription">Extra 1TB of cloud save</p>
                        </div>
                        <p className="addonPrice">
                            {billingType === "monthly" ? "+$2/mo" : "+$20/yr"}
                        </p>
                    </div>
                    <div className="addon" onClick={handleAddon}>
                        <input className="form-check-input addonCheck" type="checkbox"/>
                        <div>
                            <p className="addonName">Customizable profile</p>
                            <p className="addDescription">Custom theme on your profile</p>
                        </div>
                        <p className="addonPrice">
                            {billingType === "monthly" ? "+$2/mo" : "+$20/yr"}
                        </p>
                    </div>
                </div>
            
                <button className="backBtn" onClick={handleBack}>
                        Go Back
                </button>
                <button className="nextBtn" onClick={handleAddons}>
                    Next Step
                </button>
            
            
            
            </motion.div>
        

        </div>


     );
}