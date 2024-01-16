import './sass/index.scss'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Form1 from './components/form1'
import Form2 from './components/form2'
import Form3 from './components/form3'
import Form4 from './components/form4'
import Finish from './components/Finish'
import { Provider, useSelector } from "react-redux"
import { store } from './store/store'



export default function App() {

  const step  = useSelector((state)=>state.step.step)
  return (
      
      
      <Provider store={store}>
        <div className="app">
          {console.log(step)}

          {
            (() => {
              switch (step) {
                case 1:
                  return <Form1/>
                case 2:
                  return <Form2/>;
                case 3:
                  return <Form3/>;
                case 4:
                  return <Form4/>;
                case 5:
                  return <Finish/>;
                default:
                  return <h1>HHHHHHHH</h1>;
              }
            })()
          }



        </div>
      </Provider>
      

  )
}