import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { TeacherUseCases } from '../useCases/TeacherUseCases';
import { Link } from 'react-router-dom';
import "../styles/NewRegister.css"
import background from "../assets/editBackground.jpg"
import Loading from '../components/Loading';

function newTeacher() {
  //CPF
  const cpfRef = useRef(null);

  const [loader, setLoader] = useState(false)

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

  const [renderResponse, setRenderResponse] = useState({
    response: "",
    status: true
  })

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true)
    setValidated(true);


    const result = Object.values(valid).every(value => value === true);
    setRenderResponse(prevState => ({ ...prevState, status: false }))
    if (result) {
      const response = await TeacherUseCases.CreateTeacher(values.name, values.cpf, values.register)
      if (response) {
        setLoader(false)
      }
      setRenderResponse(prevState => ({ ...prevState, response: response }))
    }
  };

  const [valid, setValid] = useState({
    name: false,
    cpf: false,
    register: false
  })

  const [values, setValues] = useState({
    name: '',
    cpf: '',
    register: ''
  })
  const [validate, setValidate] = useState({
    name: false,
    cpf: false,
    register: false
  })

  return (
    <main style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: 'center' }}>
      <div><Link to="/cadastro"><button className='btn-light btn mt-3 ms-2'>⇦ Voltar</button></Link></div>
      <div className='main__quality'>

        {renderResponse.status ? (
          <div className=' border background_quality p-5'>
            <h2 className='mb-5'>Cadastrar Professor</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="fullName">
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control
                    value={values.name}
                    type="text"
                    placeholder="Nome Completo"
                    onChange={(event) => setValues((prevState) => ({ ...prevState, name: event.target.value }))}
                    onBlur={(() => {
                      if (values.name.length < 8) {
                        setValidate((prevState) => ({ ...prevState, name: true }))
                        setValid((prevState) => ({ ...prevState, cpf: false }))
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
                <Form.Group as={Col} controlId="cpf">
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
                <Form.Group as={Col} controlId="register">
                  <Form.Label>Registro</Form.Label>
                  <Form.Control type="text" placeholder="Registro" value={values.register} onChange={(event) => setValues((prevState) => ({ ...prevState, register: event.target.value }))} required
                    onBlur={(() => {
                      if (values.register.length > 0) {
                        setValidate((prevState) => ({ ...prevState, register: false }))
                        setValid((prevState) => ({ ...prevState, register: true }))
                      } else {
                        setValidate((prevState) => ({ ...prevState, register: true }))
                        setValid((prevState) => ({ ...prevState, register: false }))
                      }
                    })}
                    isInvalid={validate.register} />
                  <Form.Control.Feedback type="invalid" className='text-danger'>
                    Preencha com o registro do docente.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <div className='text-center'>
                <Button type="submit">Cadastrar</Button>
              </div>
            </Form>
          </div>
        ) : (
          <div className='mt-5'>
            {loader ? (<div><Loading /></div>) :
              (<div>
                <h2 className='text-center'>{renderResponse.response}</h2>
                <div className='mt-4 mb-5 text-center'>
                  <Link to="/"><button className='button__quality btn '>Voltar para Tela Inicial</button></Link>
                </div>
              </div>)}
          </div>
        )}
      </div>

    </main>
  );
}

export default newTeacher