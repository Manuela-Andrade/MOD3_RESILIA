import { useState, useEffect, useRef } from 'react';
import { AxiosApi } from "../services/RequisitionAPI"
import profile from "../assets/profile.webp"
import { Student } from '../entities/Student';
import { Link, useNavigate } from 'react-router-dom';
import { StudentUseCases } from '../useCases/StudentUseCases';
import { Form, Row } from "react-bootstrap";
import "../styles/info.css"
import Loading from '../components/Loading';


function StudentInfo() {
    const navigate = useNavigate()
    const [data, setData] = useState("")
    const [isLoading, setIsLoading] = useState("true");
    const [isEditing, setIsEditing] = useState(false);
    const [deletingStudent, setDeletingStudent] = useState(false)
    const [editedThings, setEditedThings] = useState(false)

    const [validated, setValidated] = useState(false);

    const [loader, setLoader] = useState(false)

    const [valid, setValid] = useState({
        name: true,
        cpf: true,
        birthday: true,
    })

    const [handleState, setHandleState] = useState(0)

    const [values, setValues] = useState({
        id: '',
        name: "",
        birthday: "",
        cpf: "",
        registration: "",
        classRoom: ""
    })

    const [validate, setValidate] = useState({
        name: false,
        cpf: false,
        birthday: false,
        registration: false

    })
    //CPF
    const cpfRef = useRef(null);

    const handleChange = (event) => {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/\D/g, "");

        if (inputValue.length <= 11) {
            let formattedValue = "";

            for (let i = 0; i < inputValue.length; i++) {
                if (i === 3 || i === 6) {
                    formattedValue += ".";
                }
                if (i === 9) {
                    formattedValue += "-";
                }
                formattedValue += inputValue[i];
            }

            setValues((prevState) => ({ ...prevState, cpf: formattedValue }))
            cpfRef.current.value = formattedValue;
        }
    };


    //DATA DE NASCIMENTO

    const handleBirthday = (event) => {
        let value = event.target.value;

        if (value.length === 11) {
            return;
        }

        if (value.length === 2 || value.length === 5) {
            value += '/';
        }

        setValues((prevState) => ({ ...prevState, birthday: value }))
    };



    useEffect(() => {
        async function requisitionInfo() {
            try {
                const connection = await AxiosApi.Get(window.location.pathname)
                if (connection) {
                    setValues(() => ({ id: connection.data.id, name: connection.data.nome, cpf: connection.data.cpf, birthday: connection.data.dataNascimento, registration: connection.data.matricula, classRoom: connection.data.turma }))
                    setData(connection.data)
                    setIsLoading("false")
                }
            } catch (error) {
                setIsLoading("error")
            }
        }
        requisitionInfo()
    }, [handleState])

    const handleEditClick = () => {
        setIsEditing(true);
        setHandleState(handleState + 1)
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedThings(false)
    };

    const handleSaveClick = async (event) => {
        event.preventDefault();
        setLoader(true)

        const result = Object.values(valid).every(value => value === true);
        if (result) {
            const info = new Student(values.name, values.cpf, values.birthday, values.registration, values.classRoom)
            await StudentUseCases.EditStudent(values.id, info)
            setEditedThings(true)
            setIsEditing(false);
            setHandleState(handleState + 1)
            setLoader(false)
        }
        setValidated(true);
    };
    if (deletingStudent) {
        return (
            <main className='mb-5 text-center text-white __loading' style={{ background: "#050081" }}>
                <h5>A exclusão do cadastro é irreversível.</h5>
                <p>Tem certeza que deseja deletar o cadastro?</p>
                <button className='btn btn-danger' onClick={handleDelete}>Deletar</button>
                <button className='btn btn-light ms-5' onClick={() => setDeletingStudent(false)}>Cancelar</button>
            </main>
        )
    }


    const handleDeleteStudent = () => {
        setDeletingStudent(true)
        setEditedThings(false)
    }

    async function handleDelete() {
        setDeletingStudent(false)
        setLoader(true)
        const deleteRegister = await StudentUseCases.DeleteStudent(window.location.pathname)
        if (deleteRegister) {
            alert(deleteRegister)
            return navigate('/')

        }
    }

    if (loader) {
        return (
            <main className="__loading" style={{ background: "#050081" }}>
                <Loading />
            </main>
        )
    }

    if (isLoading == "true") {
        return (
            <main style={{ backgroundColor: '#050081' }}>
                <Loading />
            </main>)
    } else if (isLoading == "error") {
        return (
            <main style={{ backgroundColor: '#050081' }} className='text-center text-white'>
                <h1>Erro 404!</h1>
                <h4>Aluno não encontrado.</h4>
                <div className='mt-4 mb-5'>
                    <Link to="/"><button className='btn-light btn'>Voltar para Tela Inicial</button></Link>
                </div>
            </main>
        )
    }
    else {
        return (
            <main style={{ backgroundColor: '#050081' }}>
                {isEditing ? (
                    <div>
                        <div className='mb-5 pt-5 text-center'>
                            <section className='d-flex flex-column border mx-5 pb-4 rounded'>
                                <div className='mb-5 pt-5 text-center rounded'>
                                    <img src={profile} alt="profile" width={'70em'} className='rounded-circle' />
                                </div>
                                <div className='d-flex justify-content-center text-white'>
                                    <Form noValidate validated={validated}>
                                        <Row className="mb-3">
                                            <Form.Group md="4" controlId="fullName">
                                                <Form.Label>Nome Completo</Form.Label>
                                                <Form.Control
                                                    value={values.name}
                                                    type="text"
                                                    placeholder="Nome Completo"
                                                    onChange={(event) => setValues((prevState) => ({ ...prevState, name: event.target.value }))}
                                                    onBlur={(() => {
                                                        if (values.name.length < 8) {
                                                            setValidate((prevState) => ({ ...prevState, name: true }))
                                                            setValid((prevState) => ({ ...prevState, name: false }))
                                                        } else {
                                                            setValidate((prevState) => ({ ...prevState, name: false }))
                                                            setValid((prevState) => ({ ...prevState, name: true }))
                                                        }
                                                    })}
                                                    required
                                                    isInvalid={validate.name}
                                                />
                                                <Form.Control.Feedback type="invalid" className='text-danger'>
                                                    Preencha com nome completo.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group md="4" controlId="cpf">
                                                <Form.Label>CPF</Form.Label>
                                                <Form.Control type="text" placeholder="000.000.000-00" ref={cpfRef} value={values.cpf} onChange={handleChange} required
                                                    onBlur={(() => {
                                                        if (values.cpf.length == 14) {
                                                            setValidate((prevState) => ({ ...prevState, cpf: false }))
                                                            setValid((prevState) => ({ ...prevState, cpf: true }))
                                                        } else {
                                                            setValidate((prevState) => ({ ...prevState, cpf: true }))
                                                            setValid((prevState) => ({ ...prevState, cpf: false }))
                                                        }
                                                    })}
                                                    isInvalid={validate.cpf}
                                                />
                                                <Form.Control.Feedback type="invalid" className='text-danger'>
                                                    Preencha com um CPF válido.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group md="4" controlId="birthday">
                                                <Form.Label>Data de Nascimento</Form.Label>
                                                <Form.Control type="text" placeholder="00/00/0000" value={values.birthday} onChange={handleBirthday} required
                                                    onBlur={(() => {
                                                        if (values.birthday.length == 10) {
                                                            setValidate((prevState) => ({ ...prevState, birthday: false }))
                                                            setValid((prevState) => ({ ...prevState, birthday: true }))
                                                        } else {
                                                            setValidate((prevState) => ({ ...prevState, birthday: true }))
                                                            setValid((prevState) => ({ ...prevState, birthday: false }))
                                                        }
                                                    })}
                                                    isInvalid={validate.birthday} />
                                                <Form.Control.Feedback type="invalid" className='text-danger'>
                                                    Preencha com a data de nascimento.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                    </Form>

                                </div>
                                <div className='mt-5'>
                                    <button className='btn-success btn mx-5 mt-4' onClick={handleSaveClick}>Salvar</button>
                                    <button className='btn-light btn mx-5 mt-4' onClick={handleCancelClick}>Cancelar</button>
                                </div>
                            </section>
                        </div>
                    </div>
                ) : (
                    <div className='text-white'>
                        <div><Link to="/"><button className='btn-light btn mt-3'>⇦ Voltar</button></Link></div>
                        <h2 className=" mx-5 d-flex justify-content-center">Informações do Aluno</h2>
                        <div className='main__quality text-white rounded border p-5 m-5'>

                            <div className='text-center mb-5'>
                                <img src={profile} alt="profile" width={'70em'} className='rounded-circle' />
                                <div>
                                    {editedThings ? (
                                        <p className='text-success text-center mt-5'>Cadastro Alterado com sucesso!</p>
                                    ) : (
                                        <p></p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p>Nome Completo: {data.nome}</p>
                                <p>Data de Nascimento: {data.dataNascimento}</p>
                                <p>CPF: {data.cpf}</p>
                                <p>Matrícula: {data.matricula}</p>
                                <p>Turma: {!data.turma ? <b className="text-danger"> "Aluno não matriculado em nenhuma turma."</b> : data.turma}</p>
                            </div>

                            <div className='button_info_quality mt-5'>
                                <div>
                                    <button className='btn btn-light mt-4 mx-2' onClick={handleEditClick}>Editar cadastro</button>

                                </div>
                                <div>
                                    <button className='btn btn-danger mt-4 mx-2' onClick={handleDeleteStudent}>Deletar Cadastro</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        );
    }
};

export default StudentInfo;
