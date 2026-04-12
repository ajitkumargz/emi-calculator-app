import { useEffect, useState } from "react";

function Calculator() {
    const [amount, SetAmount] = useState(350000);
    const [tenure, setTenure] = useState(3);
    const [rate, setRate] = useState(9);
    const [error, setError] = useState('');
    let [monthlyEmi, setmonthlyEmi] = useState(0);
    let amountPayable;
    let interest;

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
        <div>
            <div id="calculate">
                <div id="loan-amount">
                    <label>Loan Amount</label>
                    <input type="text" style={{ marginLeft: '340px' }} value={amount} onChange={e => SetAmount(e.target.value)} required /><br />
                    <span style={{ color: "red", fontSize: "15px" }}>
                        {amount < 15000 && <i>{error}</i>}</span><br />
                    <span>15,000 </span>
                    <span style={{ marginLeft: '390px' }}>25,00,000</span>
                </div><br />
                <div id="loan-tenure">
                    <label>Loan Tenure</label>
                    <input type="text" value={tenure} onChange={e => setTenure(e.target.value)} required /><br />
                    <span style={{ color: "red", fontSize: "15px" }}>
                        {tenure < 0 && <i>{error}</i>}</span><br />
                    <span>1 Year </span>
                    <span style={{ marginLeft: '400px' }}>12 Year</span>
                </div><br />
                <div id="intr-rate">
                    <label>Interest Rate</label>
                    <input type="text" value={rate} onChange={e => setRate(e.target.value)} required /><br />
                    <span style={{ color: "red", fontSize: "15px" }}>
                        {rate < 9 && <i>{error}</i>}</span><br />
                    <span>9% PA </span>
                    <span style={{ marginLeft: '380px' }}>25% PA</span>
                </div>
            </div>
            <div id="results">
                <div id="emi">
                    <h2 style={{ color: "#FFFF", fontFamily: "OpenSans_Regular", fontSize: ".875rem" }}>Your Monthly EMI:</h2>
                    <p>{monthlyEmi}</p>
                </div>
                <div id="loan-summary">
                    <label>Amount Payable</label>
                    <span style={{ marginLeft: '234px' }}>{amountPayable}</span><br /><br />
                    <label>Interest Amount</label>
                    <span style={{ marginLeft: '237px' }}>{interest}</span><br /><br />
                    <label>Principale Amount</label>
                    <span style={{ marginLeft: '220px' }}>{amount}</span>
                </div>
            </div>
        </div>
    )
}
export default Calculator;