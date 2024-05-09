package sim.tps.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VectorEstado {
    private int respuesta;
    private float recuerdaRnd;
    private String recuerda;
    private float compraRnd;
    private String compra;
    private int acumulador;
    private float probabilidad;
}
