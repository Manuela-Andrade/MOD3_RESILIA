import "../styles/loading.css"

function Loading() {
    return (
        <div>
            <div className="loading-container">
                <div className="loading"></div>
                <div id="loading-text">Carregando</div>
            </div>
        </div>
    )
}

export default Loading