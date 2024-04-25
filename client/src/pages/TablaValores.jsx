/* eslint-disable react/prop-types */
import React from "react";
import { Table } from "react-bootstrap";

const TablaValores = ({ tabla }) => {
  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Respuesta</th>
            <th>RND Recuerda</th>
            <th>Recuerda</th>
            <th>RND Compra</th>
            <th>Compra</th>
            <th>Clientes que Compran</th>
          </tr>
        </thead>
        <tbody>
          {tabla.map((e) => (
            <tr key={e.respuesta}>
              <td>{e.respuesta}</td>
              <td>{e.recuerdaRnd}</td>
              <td>{e.recuerda}</td>
              <td>{e.compraRnd}</td>
              <td>{e.compra}</td>
              <td>{e.acumulador}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export { TablaValores };
