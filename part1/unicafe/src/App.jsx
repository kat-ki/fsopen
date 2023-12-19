import {useState} from 'react'

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const rateGood = () => setGood(good + 1)
    const rateNeutral = () => setNeutral(neutral + 1)
    const rateBad = () => setBad(bad + 1)

    let all = good + neutral + bad;
    let averageScore = (good - bad) / all;
    let percentagePositive = good / all * 100 + '%';

    return (
        <>
            <h1 style={{fontWeight: 'bold'}}>Give feedback</h1>
            <Button onClickHandler={rateGood} text='good'/>
            <Button onClickHandler={rateNeutral} text='neutral'/>
            <Button onClickHandler={rateBad} text='bad'/>

            {good === 0 && neutral === 0 && bad === 0
                ?
                <div style={{fontWeight: 'bold', padding: '5px'}}>No feedback given</div>
                : (
                    <Statistics title='Statistics'
                                good={good}
                                neutral={neutral}
                                bad={bad}
                                all={all}
                                averageScore={averageScore}
                                percentagePositive={percentagePositive}
                    />
                )
            }
        </>
    )
}

export default App

const Button = ({onClickHandler, text}) => (
    <button onClick={onClickHandler}> {text} </button>
)

const Statistics = ({title, good, neutral, bad, all, averageScore, percentagePositive}) => {
    return (
        <>
            <h1 style={{fontWeight: 'bold'}}>{title}</h1>
            <table>
                <tbody>
                <StatisticLine text="Good:" value={good}/>
                <StatisticLine text="Neutral:" value={neutral}/>
                <StatisticLine text="Bad:" value={bad}/>
                <StatisticLine text="All:" value={all}/>
                <StatisticLine text="Average:" value={averageScore}/>
                <StatisticLine text="Positive:" value={percentagePositive}/>
                </tbody>
            </table>

        </>
    )
}

const StatisticLine = ({text, value}) => {
    return (
        <>
            <tr>
                <td>
                    {text}
                </td>
                <td>
                    {value}
                </td>
            </tr>
        </>
    )
}