import { useEffect, useState } from "react";

function Calculator() {
    const [amount, SetAmount] = useState(350000);
    const [tenure, setTenure] = useState(3);
    const [rate, setRate] = useState(9);
    const [error, setError] = useState('');
    let [monthlyEmi, setmonthlyEmi] = useState(0);
    let amountPayable =0;
    let interest =0;

    useEffect(() => {
        if (amount < 15000) {
            setError("Amount must be greater than 15000.");
        } else if (tenure < 0) {
            setError("Tenure cannot be Negative");
        } else if (rate < 9) {
            setError("Interest rate must be greater than 9%");
        } else {
            setError('');
        }

    }, [amount, tenure, rate]);

    if (amount > 0 && tenure > 0 && rate > 0) {
        const montlyRate = (rate / 1200);
        const montlyRateExp = Math.pow((montlyRate + 1), (tenure * 12));
        monthlyEmi = (amount * montlyRate) * (montlyRateExp) / (montlyRateExp - 1);

        interest = Math.round((monthlyEmi * tenure * 12) - Number(amount));
        amountPayable = Number(amount) + Number(interest);
        if (!Number.isFinite(monthlyEmi)) monthlyEmi = 0;
    }
    monthlyEmi = Math.round(monthlyEmi);

    return (
        <div id="maindiv">
            <div id="calculate">
                <span style={{ color: "red", fontSize: "15px" }}>
                        {amount < 15000 && <i>{error}</i>}</span>

                <span style={{ color: "red", fontSize: "15px" }}>
                        {tenure < 0 && <i>{error}</i>}</span>

                <span style={{ color: "red", fontSize: "15px" }}>
                        {rate < 9 && <i>{error}</i>}</span>

                <table>
                    <tr>
                        <th><span id="lmin"> Loan Amount</span></th>
                        <td><input value={amount} onChange={e => SetAmount(e.target.value)} required /></td><br/>
                    </tr>
                    <tr>
                       <th><span id="lmin">&#8377; 15,000 </span></th> 
                       <td><span id="lmax">&#8377; 25,00,000</span></td>
                    </tr>

                    <tr>
                        <th><span id="lmin">Loan Tenure</span></th>
                        <td><input type="text" value={tenure} onChange={e => setTenure(e.target.value)} required /></td><br/>
                        
                    </tr>
                    <tr>
                       <th><span id="lmin">1 Year </span></th> 
                       <td><span id="lmax">12 Year</span></td>
                    </tr>

                     <tr>
                        <th><span id="lmin">Interest Rate</span></th>
                        <td><input type="text" value={rate} onChange={e => setRate(e.target.value)} required /></td><br/>
                    </tr>
                    <tr>
                       <th><span id="lmin">9% PA</span></th> 
                       <td><span id="lmax">25% PA</span></td>
                    </tr>
                </table>
            </div>
            <div id="results">
                <div id="emi">
                    <h2>Your Monthly EMI:</h2>
                    <p><b>&#8377; {monthlyEmi}</b></p>
                </div>
                <div id="loan-summary">
                    <table>
                        <tr>
                            <th><span id="lmin">Amount Payable</span></th>
                            <td><span id="lmax">&#8377; {amountPayable}</span></td>
                        </tr>
                        <tr>
                            <th><span id="lmin">Interest Amount</span></th>
                            <td><span id="lmax">&#8377; {interest}</span></td>
                        </tr>
                        <tr>
                            <th><span id="lmin">Principale Amount</span></th>
                            <td><span id="lmax">&#8377; {amount}</span></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Calculator;