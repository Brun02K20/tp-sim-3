package sim.tps.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RequestDto {
    @JsonProperty("cpra_no_def_si")
    private float compraNoDefSi;

    @JsonProperty("cpra_no_dudoso")
    private float compraNoDudoso;

    @JsonProperty("cpra_no_def_no")
    private float compraNoDefNo;

    @JsonProperty("cpra_si_def_si")
    private float compraSiDefSi;

    @JsonProperty("cpra_si_def_no")
    private float compraSiDefNo;

    @JsonProperty("cpra_si_dudoso")
    private float compraSiDudoso;

    @JsonProperty("sirecuerda")
    private float siRecuerda;

    @JsonProperty("norecuerda")
    private float noRecuerda;

    private int n;

    @JsonProperty("primer_rta")
    private int primerRta;

    @JsonProperty("cant_a_mostrar")
    private int cantAMostrar;
}
