import "../styles/registry.css"
import { Link } from "react-router-dom"
import alun from '../assets/alun.png'
import prof from '../assets/prof.png'
import turm from '../assets/turm.png'



function Registry() {
    return (
        <>
            <main className="p-5">
                <section className='d-flex wrap mt-3 justify-content-center flex-wrap'>
                    <div className="div_registry m-4 my-5 rounded d-flex flex-column">
                        <img src={alun} alt="aluno" className="iconesH mt-3" />
                        <h3 className="text-center  #050081">Aluno</h3>
                        <button className="button__ btn-light m-5"><Link to="/new/aluno" className="text-white">CADASTRAR</Link></button>
                    </div>
                    <div className="div_registry m-4 my-5 rounded d-flex flex-column">
                        <img src={prof} alt="professor" className="iconesH mt-3" />
                        <h3 className="text-center #050081">Professor</h3>

                        <button className="button__ btn-light m-5"><Link to="/new/professor" className="text-white">CADASTRAR</Link></button>
                    </div>
                    <div className="div_registry m-4 my-5 rounded d-flex flex-column">
                        <img src={turm} alt="turma" className="iconesH mt-3" />
                        <h3 className="text-center #050081 ">Turma</h3>

                        <button className="button__ btn-light m-5"><Link to="/new/turma" className="text-white">CADASTRAR</Link></button>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Registry