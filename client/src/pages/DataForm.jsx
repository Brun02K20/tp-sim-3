/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProbabilidadesInput } from "../components/ProbabilidadesInput";
import axios from "axios";
import { simular } from "../api/api";
import "../App.css";

const DataForm = ({ respuestas, setRespuestas }) => {
  const {
    reset,
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(respuestas);
  }, [respuestas]);

  const onSubmit = async (data) => {
    data.sirecuerda = parseFloat(data.sirecuerda);
    data.norecuerda = parseFloat(data.norecuerda);
    data.cpra_si_def_no = parseFloat(data.cpra_si_def_no);
    data.cpra_si_dudoso = parseFloat(data.cpra_si_dudoso);
    data.cpra_si_def_si = parseFloat(data.cpra_si_def_si);
    data.cpra_no_def_no = parseFloat(data.cpra_no_def_no);
    data.cpra_no_dudoso = parseFloat(data.cpra_no_dudoso);
    data.cpra_no_def_si = parseFloat(data.cpra_no_def_si);
    data.n = parseInt(data.n);
    data.primer_rta = parseInt(data.primer_rta);
    data.cant_a_mostrar = parseInt(data.cant_a_mostrar);

    const response = await simular(data);
    if (typeof response === "string") {
      setError(response);
      return;
    }
    setError("");
    setRespuestas(response);
    navigate("/tabla");
  };

  return (
    <>
        <div className="card">
            <h3>Probabilidades</h3>
            <></>
            <Row className="align-items-start">
                {/* Primera columna */}
                <Col>
                    <h4 className="text-center">Recuerda</h4>
                    <ProbabilidadesInput
                        id="input1"
                        label="Sí"
                        campo="sirecuerda"
                        control={control}
                        errors={errors}
                    />

                    <ProbabilidadesInput
                        id="input2"
                        label="No"
                        campo="norecuerda"
                        control={control}
                        errors={errors}
                    />
                </Col>

                {/* Segunda columna */}
                <Col>
                    <h4 className="text-center">Compra si recuerda</h4>
                    <ProbabilidadesInput
                        id="input3"
                        label="Definitivamente no"
                        campo="cpra_si_def_no"
                        control={control}
                        errors={errors}
                    />

                    <ProbabilidadesInput
                        id="input4"
                        label="Dudoso"
                        campo="cpra_si_dudoso"
                        control={control}
                        errors={errors}
                    />

                    <ProbabilidadesInput
                        id="input5"
                        label="Definitivamente sí"
                        campo="cpra_si_def_si"
                        control={control}
                        errors={errors}
                    />
                </Col>

                {/* Tercera columna */}
                <Col>
                    <h4 className="text-center">Compra si no recuerda</h4>
                    <ProbabilidadesInput
                        id="input6"
                        label="Definitivamente no"
                        campo="cpra_no_def_no"
                        control={control}
                        errors={errors}
                    />

                    <ProbabilidadesInput
                        id="input7"
                        label="Dudoso"
                        campo="cpra_no_dudoso"
                        control={control}
                        errors={errors}
                    />

                    <ProbabilidadesInput
                        id="input8"
                        label="Definitivamente sí"
                        campo="cpra_no_def_si"
                        control={control}
                        errors={errors}
                    />
                </Col>
            </Row>
            <hr/>
            <h3>Simulación</h3>
            <Row className="align-items-start">
                <Col>
                    <Form.Group controlId="input9" style={{margin: "8px"}}>
                        <div className="d-flex align-items-center">
                            <Form.Label
                                className="mr-2"
                                style={{
                                    marginRight: "12px",
                                    width: "500px",
                                    textAlign: "left",
                                }}
                            >
                                Cantidad de respuestas
                            </Form.Label>
                            <Controller
                                name="n"
                                control={control}
                                rules={{
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Solo se permiten números positivos en este campo",
                                    },
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido",
                                    },
                                    max: {
                                        value: 100000000,
                                        message: "El valor máximo es 100000000",
                                    },
                                }}
                                render={({field}) => (
                                    <Form.Control type="number" {...field} />
                                )}
                            />
                        </div>
                        {errors.n && (
                            <span
                                style={{
                                    color: "red",
                                    fontWeight: "600",
                                }}
                            >
                {errors.n.message}
              </span>
                        )}
                    </Form.Group>
                    <Form.Group controlId="input10" style={{margin: "8px"}}>
                        <div className="d-flex align-items-center">
                            <Form.Label
                                className="mr-2"
                                style={{
                                    marginRight: "12px",
                                    width: "500px",
                                    textAlign: "left",
                                }}
                            >
                                Número de primer respuesta
                            </Form.Label>
                            <Controller
                                name="primer_rta"
                                control={control}
                                rules={{
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Solo se permiten números positivos en este campo",
                                    },
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido",
                                    },
                                    min: {
                                        value: 1,
                                        message: "El valor mínimo permitido es 1",
                                    }
                                }}
                                render={({field}) => (
                                    <Form.Control type="number" {...field} />
                                )}
                            />
                        </div>
                        {errors.primer_rta && (
                            <span
                                style={{
                                    color: "red",
                                    fontWeight: "600",
                                }}
                            >
                {errors.primer_rta.message}
              </span>
                        )}
                    </Form.Group>
                    <Form.Group controlId="input11" style={{margin: "8px"}}>
                        <div className="d-flex align-items-center">
                            <Form.Label
                                className="mr-2"
                                style={{
                                    marginRight: "12px",
                                    width: "500px",
                                    textAlign: "left",
                                }}
                            >
                                Cantidad de respuestas a mostrar
                            </Form.Label>
                            <Controller
                                name="cant_a_mostrar"
                                control={control}
                                rules={{
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Solo se permiten números positivos en este campo",
                                    },
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido",
                                    },
                                    min: {
                                        value: 1,
                                        message: "El valor mínimo permitido es 1",
                                    },
                                    max: {
                                        value: 100000,
                                        message: "El valor máximo es 100000",
                                    },
                                }}
                                render={({field}) => (
                                    <Form.Control type="number" {...field} />
                                )}
                            />
                        </div>
                    </Form.Group>
                    {errors.cant_a_mostrar && (
                        <span
                            style={{color: "red", fontWeight: "600"}}
                        >
              {errors.cant_a_mostrar.message}
            </span>
                    )}
                </Col>
            </Row>
            {error &&
                <p style={{color: "red", fontWeight: "600"}}>
                    {error}
                </p>
            }
            <Button
                className="btn"
                variant="success"
                onClick={handleSubmit(onSubmit)}
            >
                Simular
            </Button>
        </div>

    </>
  );
};

export {DataForm};
