import './App.css'
import Calculator from './Calculator'
import Disclaimer from './Disclaimer'

function App() {

  return (
    <div id='appid'>
      <h1 style={{marginTop:"80px"}}>Personal Loan EMI Calculator</h1>
      <p>Bring Clarity to Your Financial Future. Calculate your EMIs now!</p>
      <Calculator />
      <Disclaimer />
    </div>
  )
}

export default App
