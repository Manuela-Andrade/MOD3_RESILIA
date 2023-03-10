import notFound from "../assets/notFound.webp"
import Footer from "../components/Footer"
import Header from "../components/Header"
function ErrorPage() {
    return (
        <div>
            <Header />
            <main className="text-center mt-5">
                <img src={notFound} className="w-50 rounded mt-5 p-5"></img>
            </main>
            <Footer />
        </div>
    )
}

export default ErrorPage