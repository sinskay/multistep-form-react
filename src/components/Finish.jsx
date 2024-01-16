import Done from "/images/icon-thank-you.svg"
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";


const finishAnimation = {
    hidden: {
        opacity:0,
        y:100
    },
    visible: {
        opacity:1,
        y:0
    }
}


export default function Finish(){
    return ( 

        <div className="container formContainer">
            
            <Sidebar/>
            <motion.div className="formN"
              variants={finishAnimation}
              initial={"hidden"}
              animate={"visible"}
              transition={{duration: .5}}
            >





                <div className="Finish">
                    <img src={Done} alt="icon"/>
                    <h1 className="formTitle">Thank you!</h1>
                    <p className="formDescription">
                        Thanks for confirming your subscription! We hope
                        you have fun using our platform. If you ever
                        need support, please feel free to email us at
                        support@loremgaming.com.
                    </p>
                </div>


            </motion.div>

        </div>


     );
}