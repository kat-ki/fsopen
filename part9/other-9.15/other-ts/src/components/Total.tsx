type TotalProps = {
    total: number
}
const Total = ({total}: TotalProps) => {
    return (
        <div>
            <p>
                Number of exercises: <b>{total}</b>
            </p>
        </div>
    );
};

export default Total;