/* eslint-disable react/prop-types */
import React from "react";
import { FixedSizeList as List } from 'react-window';
import { Table } from "react-bootstrap";
import tab from "bootstrap/js/src/tab.js";

const TablaValores = ({ tabla }) => {
    // Definimos la fila adicional
    const Encabezado = () => (
        <tr>
            <th style={{ width: "15%" }}>Respuesta</th>
            <th style={{ width: "15%" }}>RND Recuerda</th>
            <th style={{ width: "10%" }}>Recuerda</th>
            <th style={{ width: "15%" }}>RND Compra</th>
            <th style={{ width: "25%" }}>Compra</th>
            <th style={{ width: "20%" }}>Clientes que Compran</th>
        </tr>
    );

    const Row = ({ index, style }) => {
        const e = tabla[index];
        return (
            <div style={{ ...style, display: "flex" }}>
                <div style={{ width: "15%" }}>{e.respuesta}</div>
                <div style={{ width: "15%" }}>{e.recuerdaRnd.toFixed(4)}</div>
                <div style={{ width: "12%" }}>{e.recuerda}</div>
                <div style={{ width: "18%" }}>{e.compraRnd.toFixed(4)}</div>
                <div style={{ width: "25%" }}>{e.compra}</div>
                <div style={{ width: "20%" }}>{e.acumulador}</div>
            </div>
        );
    };

    const probabilidad = tabla[ tabla.length -1].acumulador / tabla[ tabla.length -1].respuesta

    return (
        <div style={{ height: 500, width: 1000 }}>
            <Table responsive striped bordered hover>
                <thead>
                <Encabezado /> {/* Agregamos el encabezado antes de la lista */}
                </thead>
            </Table>
            <List
                height={400}
                itemCount={tabla.length}
                itemSize={50}
                width="100%"
            >
                {Row}
            </List>

            <div>
                <p>
                    La probabilidad de que el cliente compre el producto es de: {Math.round(probabilidad * 100, 2) }%
                </p>
            </div>
        </div>
    );
};

export { TablaValores };
