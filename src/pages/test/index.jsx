const MyComponent = () => {

    const someArray = ["sasoin", "asdnod", "asoidn", "sdoidan"]
    const mapList = () => {
        return someArray.map((val) => <p>{val}</p>)
    }
    return (
        <div color="white">
            {mapList()}
        </div>
    )

}

export default MyComponent
