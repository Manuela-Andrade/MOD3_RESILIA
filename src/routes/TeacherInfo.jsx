import { useState, useEffect, useRef } from 'react';
import { AxiosApi } from "../services/RequisitionAPI"
import { Link, useNavigate } from 'react-router-dom';
import profile from "../assets/profile.webp"
import { Teacher } from '../entities/Teacher';
import { TeacherUseCases } from '../useCases/TeacherUseCases';
import "../styles/info.css"
import Loading from '../components/Loading';
import { Form, Row } from "react-bootstrap";

function TeacherInfo() {
    const navigate = useNavigate()
    const [data, setData] = useState('')
    const [isLoading, setIsLoading] = useState("true");
    const [isEditing, setIsEditing] = useState(false);
    const [deletingTeacher, setDeletingTeacher] = useState(false);
    const [editedThings, setEditedThings] = useState(false);

    const [validated, setValidated] = useState(false);
    const [handleState, setHandleState] = useState(0);

    const [loader, setLoader] = useState(false)

    const [valid, setValid] = useState({
        name: true,
        cpf: true,
        birthday: true,
    })

    const [values, setValues] = useState({
        id: '',
        name: "",
        cpf: "",
        register: "",
        classRoom: ""
    })

    const [validate, setValidate] = useState({
        name: false,
        cpf: false,
        register: false

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


    useEffect(() => {
        async function requisitionInfo() {
            try {
                const connection = await AxiosApi.Get(window.location.pathname)
                if (connection) {
                    setValues(() => ({ id: connection.data.id, name: connection.data.nome, cpf: connection.data.cpf, register: connection.data.registro, classRoom: connection.data.turma }))
                    setData(connection.data)
                    setIsLoading("false")
                }
            } catch (error) {
                setIsLoading("error")
            }
        }
        requisitionInfo()
    }, [handleState, editedThings])





    const handleEditClick = () => {
        setIsEditing(true);
        setHandleState(handleState + 1);

    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedThings(false);
    };

    const handleSaveClick = async (event) => {
        event.preventDefault();
        setLoader(true)
        const result = Object.values(valid).every(value => value === true);

        if (result) {
            const info = new Teacher(values.name, values.cpf, values.register, values.classRoom)
            await TeacherUseCases.EditTeacher(values.id, info)
            setEditedThings(true)
            setIsEditing(false);
            setHandleState(handleState + 1)
            setLoader(false)
        }
        setValidated(true);
    };

    if (deletingTeacher) {
        return (
            <main className='mb-5 text-center text-white __loading' style={{ background: "#050081" }}>
                <h5>A exclusão do cadastro é irreversível.</h5>
                <p>Tem certeza que deseja deletar o cadastro?</p>
                <button className='btn btn-danger' onClick={handleDelete}>Deletar</button>
                <button className='btn btn-light ms-5' onClick={() => setDeletingTeacher(false)}>Cancelar</button>
            </main>
        )
    }

    if (loader) {
        return (
            <main className="__loading" style={{ background: "#050081" }}>
                <Loading />
            </main>
        )
    }

    const handleDeleteTeacher = () => {
        setDeletingTeacher(true);
        setEditedThings(false);
    }

    async function handleDelete() {
        setLoader(true)
        setDeletingTeacher(false)
        const remove = await TeacherUseCases.DeleteTeacher(window.location.pathname)
        if (remove) {
            alert(remove);
            return navigate('/')
        }


    }

    if (isLoading == "true") {
        return (
            <main className='__loading' style={{ backgroundColor: '#050081' }}>
                <Loading />
            </main>)
    } else if (isLoading == "error") {
        return (
            <main className='text-center text-white __loading' style={{ backgroundColor: '#050081' }}>
                <h1>Erro 404!</h1>
                <h4>Professor não encontrado.</h4>
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
                            <section className='d-flex flex-column border mx-5 pb-4 pt-3 rounded'>
                                <div className='mb-5 text-center rounded'>
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
                                            <Form.Group md="4" controlId="registro">
                                                <Form.Label>Registro</Form.Label>
                                                <Form.Control type="text" placeholder="Ex: 12345" value={values.register} onChange={(event) => setValues((prevState) => ({ ...prevState, register: event.target.value }))} required
                                                    onBlur={(() => {
                                                        if (values.register.length > 4) {
                                                            setValidate((prevState) => ({ ...prevState, register: false }))
                                                            setValid((prevState) => ({ ...prevState, register: true }))
                                                        } else {
                                                            setValidate((prevState) => ({ ...prevState, register: true }))
                                                            setValid((prevState) => ({ ...prevState, register: false }))
                                                        }
                                                    })}
                                                    isInvalid={validate.register}
                                                />
                                                <Form.Control.Feedback type="invalid" className='text-danger'>
                                                    Preencha com o registro do docente.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                    </Form>

                                </div>
                                <div className='mt-5'>
                                    <button className='btn-success btn mx-5 mt-3' onClick={handleSaveClick}>Salvar</button>
                                    <button className='btn-light btn mx-5 mt-3' onClick={handleCancelClick}>Cancelar</button>
                                </div>
                            </section>
                        </div>
                    </div>
                ) : (
                    <div className='text-white'>
                        <div><Link to="/"><button className='btn-light btn mt-3'>⇦ Voltar</button></Link></div>
                        <h2 className=" mx-5 d-flex justify-content-center">Informações do Professor</h2>
                        <div className='main__quality text-white border rounded p-5 m-5'>

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
                                <p>CPF: {data.cpf}</p>
                                <p>Registro: {data.registro}</p>
                                <p>Turma: {!data.turma ? <b className="text-danger"> "Professor não cadastrado em nenhuma turma."</b> : data.turma} </p>
                            </div>
                            <div className='button_info_quality mt-5'>
                                <div>
                                    <button className='btn btn-light mx-2 mt-5' onClick={handleEditClick}>Editar cadastro</button>
                                </div>
                                <div>
                                    <button className='btn btn-danger mx-2 mt-5' onClick={handleDeleteTeacher}>Deletar Cadastro</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        );
    }
};

export default TeacherInfo