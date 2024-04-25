package sim.tps.api.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sim.tps.api.dto.RequestDto;
import sim.tps.api.dto.VectorEstado;
import sim.tps.api.services.MontecarloService;

import java.util.List;

@RestController
@RequestMapping("/montecarlo")
@RequiredArgsConstructor
@CrossOrigin(origins= "*")
public class MontecarloController {

    private final MontecarloService montecarloService;

    @GetMapping("/simular")
    public ResponseEntity<?> simular(@RequestBody RequestDto request) {
        try {
            return ResponseEntity.ok(montecarloService.simular(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }
}
