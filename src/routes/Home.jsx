import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import "../styles/home.css"
import { AxiosApi } from "../services/RequisitionAPI"
import aluno from '../assets/aluno.png'
import professor from '../assets/professor.png'
import turma from '../assets/turma.png'
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'
import Loading from "../components/Loading"
import RadioButton from "../components/RadioButton"


const options = [
    {
        id: 1,
        value: 'alunos',
        label: 'Aluno',
        imageUrl: `${aluno}`,
    },
    {
        id: 2,
        value: "professores",
        label: 'Professor',
        imageUrl: `${professor}`,
    },
    {
        id: 3,
        value: 'turmas',
        label: 'Turma',
        imageUrl: `${turma}`,
    },
];


function Home() {
    const [search, setSearch] = useState("")
    const [data, setData] = useState(undefined);
    const [requisitionData, setRequisitionData] = useState(undefined);
    const [searchError, setSearchError] = useState('')
    const [selectedOption, setSelectedOption] = useState('alunos')
    const [loadingScreen, setLoadingScreen] = useState(true)


    const handleOptionChange = (event) => {
        setSelectedOption(event)
    };

    useEffect(() => {
        async function requisitionInfo() {
            try {
                const connection = await AxiosApi.Get(`/${selectedOption}`)
                setRequisitionData(connection.data)
            } catch (error) {
                setLoadingScreen(false)
            }
        }
        requisitionInfo()
    }, [selectedOption])



    useEffect(() => {
        if (search === "") {
            setRequisitionData(data)
            setSearchError("")
        }
    }, [search])

    const submitSearch = async (e) => {
        e.preventDefault()
        setData(requisitionData)
        let result
        if (selectedOption === "turmas") {
            result = requisitionData.filter(data => data.turma == search)
        } else {
            result = requisitionData.filter(data => data.nome == search).length == 0 ? requisitionData.filter(data => data.matricula == search) : requisitionData.filter(data => data.nome == search);
        }
        if (result.length == 0) {
            setRequisitionData(result)
            setSearchError("Nenhum cadastro encontrado.")
        } else {
            setRequisitionData(result)

        }
    }
    return (
        <main>
            <div className="color__home pb-5">
                <div>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={img1}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={img2}
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={img3}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>

                <section className="d-flex justify-content-center filter__home py-5 ">
                    <div >
                        <div className="d-flex justify-content-center search__input mt-2">
                            <form onSubmit={submitSearch}>
                                <input type="text" placeholder="Buscar" value={search} className="form-control border-secondary rounded-pill " onChange={e => setSearch(e.target.value)} />
                            </form>
                        </div>

                        <div>
                            <div className="text-center ">
                                <div className="d-flex flex-column">
                                    <h2 className="mb-4">Selecione uma opção:</h2>
                                    <div className="d-flex radios_quality">
                                    <RadioButton
                                        options={options}
                                        name="opcoes"
                                        checkedValue={selectedOption}
                                        onChange={handleOptionChange}
                                    />
                                    </div>
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <div className="list_div border mt-5 mx-5 rounded">
                    <p>{searchError}</p>
                    {requisitionData ? (
                        <div className="dadosHome">
                            {requisitionData.map((info) => (
                                <div className="border m-3 bg-white px-2 info__ justify-content-between rounded " key={info.id}>
                                    <p className="m-2">{info.nome ? (`Nome: ${info.nome}`) : (`Turma: ${info.turma}`)}</p>
                                    <p className="m-2">{info.matricula ? (`Matrícula: ${info.matricula}`) : (null)}</p>
                                    <Link to={`/${selectedOption}/${info.id}`}> <button className="btn list__button px-3 me-2 my-2">info</button></Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            {loadingScreen ?
                                (
                                    <div>
                                        <Loading />
                                        <p className="mt-5 text-center">Carregando informações...</p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="mt-5 text-center">Erro Interno, Tente novamente mais tarde.(error code: 28L H)</p>
                                    </div>
                                )}
                        </div>
                    )}
                </div>
            </div>
        </main >
    )
}

export default Home