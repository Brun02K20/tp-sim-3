/* eslint-disable react/prop-types */
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";

const ProbabilidadesInput = ({ control, errors, id, label, campo }) => {
  return (
    <Form.Group controlId={id} style={{ margin: "8px" }}>
      <div className="d-flex align-items-center">
        <Form.Label
          className="mr-2"
          style={{ marginRight: "12px", width: "300px" }}
        >
          {label}
        </Form.Label>
        <Controller
          name={campo}
          control={control}
          rules={{
            pattern: {
                value: /^(\d{1,2}(\.\d*)?|100(\.0*)?)$/,
                message: "Porcentaje inválido"
            },
            required: {
              value: true,
              message: "Este campo es requerido",
            }
          }}
          render={({ field }) => (
            <Form.Control type="number" {...field} placeholder="%"/>
          )}
        />
      </div>
      {errors[campo] && (
        <span style={{ marginLeft: "140px", color: "red", fontWeight: "600" }}>
          {errors[campo].message}
        </span>
      )}
    </Form.Group>
  );
};

export { ProbabilidadesInput };
