/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProbabilidadesInput } from "../components/ProbabilidadesInput";
import axios from "axios";
import { simular } from "../api/api";

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
      <h3 className="text-center text-decoration-underline">PROBABILIDADES</h3>
      <></>
      <Row className="align-items-start">
        {/* Primera columna */}
        <Col>
          <h4 className="text-center">Recuerda?</h4>
          <ProbabilidadesInput
            id="input1"
            label="SI"
            campo="sirecuerda"
            control={control}
            errors={errors}
          />

          <ProbabilidadesInput
            id="input2"
            label="NO"
            campo="norecuerda"
            control={control}
            errors={errors}
          />
        </Col>

        {/* Segunda columna */}
        <Col>
          <h4 className="text-center">Compra si Recuerda</h4>
          <ProbabilidadesInput
            id="input3"
            label="Definitivamente NO"
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
            label="Definitivamente SI"
            campo="cpra_si_def_si"
            control={control}
            errors={errors}
          />
        </Col>

        {/* Tercera columna */}
        <Col>
          <h4 className="text-center">Compra si NO Recuerda</h4>
          <ProbabilidadesInput
            id="input6"
            label="Definitivamente NO"
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
            label="Definitivamente SI"
            campo="cpra_no_def_si"
            control={control}
            errors={errors}
          />
        </Col>
      </Row>
      <hr />
      <h3 className="text-center text-decoration-underline">SIMULACIÓN</h3>
      <Row className="align-items-start">
        <Col>
          <Form.Group controlId="input9" style={{ margin: "8px" }}>
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
                  min: {
                    value: 100000,
                    message: "El valor mínimo permitido es 100000",
                  },
                  max: {
                    value: 1000000,
                    message: "El valor máximo es 1000000",
                  },
                }}
                render={({ field }) => (
                  <Form.Control type="number" {...field} />
                )}
              />
            </div>
            {errors.n && (
              <span
                style={{
                  marginRight: "300px",
                  color: "red",
                  fontWeight: "600",
                }}
              >
                {errors.n.message}
              </span>
            )}
          </Form.Group>
          <Form.Group controlId="input10" style={{ margin: "8px" }}>
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
                  },
                  max: {
                    value: 900000,
                    message: "El valor máximo es 900000",
                  },
                }}
                render={({ field }) => (
                  <Form.Control type="number" {...field} />
                )}
              />
            </div>
            {errors.primer_rta && (
              <span
                style={{
                  marginRight: "300px",
                  color: "red",
                  fontWeight: "600",
                }}
              >
                {errors.primer_rta.message}
              </span>
            )}
          </Form.Group>
          <Form.Group controlId="input11" style={{ margin: "8px" }}>
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
                    value: 2,
                    message: "El valor mínimo permitido es 2",
                  },
                  max: {
                    value: 10000,
                    message: "El valor máximo es 10000",
                  },
                }}
                render={({ field }) => (
                  <Form.Control type="number" {...field} />
                )}
              />
            </div>
          </Form.Group>
          {errors.cant_a_mostrar && (
            <span
              style={{ marginRight: "300px", color: "red", fontWeight: "600" }}
            >
              {errors.cant_a_mostrar.message}
            </span>
          )}
        </Col>
      </Row>
      {error && <p>{error}</p>}
      <Button
        style={{
          border: "none",
        }}
        variant="success"
        onClick={handleSubmit(onSubmit)}
      >
        Simular
      </Button>
    </>
  );
};

export { DataForm };
