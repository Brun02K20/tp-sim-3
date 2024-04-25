package sim.tps.api.services;

import org.springframework.stereotype.Service;
import sim.tps.api.dto.RequestDto;
import sim.tps.api.dto.VectorEstado;
import java.util.ArrayList;
import java.util.List;

@Service
public class MontecarloService {

    public List<VectorEstado> simular(RequestDto request) {

        Experimento experimento = new Experimento(
                acumularProbabilidades(new float[]{request.getSiRecuerda(), request.getNoRecuerda()}),
                acumularProbabilidades(new float[]{request.getCompraSiDefSi(), request.getCompraSiDudoso(), request.getCompraSiDefNo()}),
                acumularProbabilidades(new float[]{request.getCompraNoDefSi(), request.getCompraNoDudoso(), request.getCompraNoDefNo()})
        );

        List<VectorEstado> tabla = new ArrayList<>();

        int n = request.getN();
        int i = request.getPrimerRta();
        int j = request.getCantAMostrar();

        if (i > n) throw new IllegalArgumentException("El número de la primera respuesta es demasiado grande");

        for (int iteracion = 1; iteracion < n + 1; iteracion++) {
            experimento.simularRespuesta();
            if (i <= iteracion && iteracion <= i + j || iteracion == n) {
                tabla.add(experimento.getVectorEstado());
            }
        }

        return tabla;
    }

    public float[] acumularProbabilidades(float[] lista) {
        float[] acumuladas = new float[lista.length];
        for (int i = 0; i < lista.length ; i++) {
            if (i == 0) {
                acumuladas[0] = lista[0];
                continue;
            }

            acumuladas[i] = acumuladas[i - 1] + lista[i];
        }

        if (acumuladas[lista.length - 1] != 100) {
            throw new IllegalArgumentException("La suma de las probabilidades de alguna de las 3 columnas no da 100%");
        }

        return acumuladas;
    }
}
