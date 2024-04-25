import React from "react";
import { Table } from "react-bootstrap";

const TablaValores = () => {
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
      </Table>
    </>
  );
};

export { TablaValores };
