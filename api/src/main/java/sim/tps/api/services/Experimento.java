package sim.tps.api.services;

import lombok.Getter;
import sim.tps.api.dto.VectorEstado;
import java.util.*;

@Getter
public class Experimento {

    private final float[] r; // por ejemplo: r = [0.4, 1]
    private final List<float[]> c;  // por ejemplo: c = [[0.3, 0.8, 1], [0.1, 0.6, 1]]
    private final Random generador;
    private VectorEstado vectorEstado;

    public Experimento(float[] r, float[] c1, float[] c2) {
        this.r = r;
        this.c = List.of(c1, c2);
        this.generador = new Random();
        this.vectorEstado = new VectorEstado(0, 0f, "", 0f, "", 0);
    }

    // parseo de int a cadena de caracteres
    // 0 -> "Definitivamente sí"   | 0 -> "Sí"
    // 1 -> "Dudoso"               | 1 -> "No"
    // 2 -> "Definitivamente no"   |
    public String aString(int indice, String[] strings) {
        return strings[indice];
    }

    // Devuelve el índice correspondiente de un random en una lista de probabilidades acumuladas
    public int detectarIntervalo(float random, float[] probabilidades) {
        for (int i = 0; i < probabilidades.length; i++) {
            if (random < probabilidades[i] / 100) return i;
        }
        return -1;
    }

    // Simula una respuesta y devuelve un VectorEstado
    public void simularRespuesta() {
        int acumulador = this.vectorEstado.getAcumulador();

        float recuerdaRnd = generador.nextFloat();
        float compraRnd = generador.nextFloat();

        int recuerda = detectarIntervalo(recuerdaRnd, this.r);
        int compra = detectarIntervalo(compraRnd, c.get(recuerda));

        this.vectorEstado = VectorEstado.builder()
                .respuesta(this.vectorEstado.getRespuesta() + 1)
                .recuerdaRnd(recuerdaRnd)
                .recuerda(aString(recuerda, new String[]{"Sí", "No"}))
                .compraRnd(compraRnd)
                .compra(aString(compra, new String[]{"Definitivamente sí", "Dudoso", "Definitivamente no"}))
                .acumulador(compra == 0 ? acumulador + 1 : acumulador)
        .build();
    }
}
