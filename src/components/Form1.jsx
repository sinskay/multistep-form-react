import Sidebar from "./Sidebar";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch,useSelector } from "react-redux";
import { next } from "../store/appSlice";
import { motion } from "framer-motion";



const phoneRegExp = /^\+\d{1,4} \d{1,4} \d{1,10}$/;
const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;

const schema = yup.object({
    name: yup.string().required("This field is required").min(3,"name too short"),
    email: yup.string().required("This field is required").matches(emailRegExp,"Invalid email"),
    phone: yup.string().required("This field is required")
    .matches(phoneRegExp,"Invalid phone number")
})





export default function Form1() {

    const dispatch = useDispatch();
    const animatieObj = useSelector((state)=>state.step.animations)

    const { register,handleSubmit, formState} = useForm({
        
        mode: "onBlur",
        resolver: yupResolver(schema)


        


    })

    const { errors,isValid, } = formState;


    const handleForm1 = (data)=>{
        console.log(data);
        if(isValid){
            dispatch(next());
        }
    }

    return ( 

        <div className="container formContainer">
            
            <Sidebar currentStep={1}/>
            


            <motion.div className="formN"
            variants={animatieObj}
            initial="hidden"
            animate="visible"
            >

                <div className="formInfo">
                    <h1 className="formTitle">Personal Info</h1>
                    <p className="formDescription">
                        Please provide your name, email address, and phone number
                    </p>
                </div>

                <form className="formInputs">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="name">Name</label>
                        {errors.name && <span className="errorMsg">{errors.name.message}</span>}
                        <input type="text" className="form-control" id="name" {...register("name")} placeholder="e.g. Stephen King"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="emailAddress">Email Address</label>
                        {errors.email && <span className="errorMsg">{errors.email.message}</span>}
                        <input type="text" className="form-control" id="emailAddress" {...register("email")} placeholder="e.g. stephenking@lorem.com"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                        {errors.phone && <span className="errorMsg">{errors.phone.message}</span>}
                        <input type="text" className="form-control" id="phoneNumber" {...register("phone")} placeholder="e.g. +1 234 567 890"/>
                    </div>

                </form>
                <button disabled={!isValid} className="nextBtn" onClick={handleSubmit(handleForm1)}>
                    Next Step
                </button>

            </motion.div>

        </div>


     );
}