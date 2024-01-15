package treino.treinoapplication.rest;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import treino.treinoapplication.entities.Treino;
import treino.treinoapplication.repositories.TreinoRepository;

import java.util.List;

@RestController
@RequestMapping("/treino")
@AllArgsConstructor
public class TreinoRest {
    private TreinoRepository repository;

    @GetMapping
    public ResponseEntity<List<Treino>> findAll(){
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<Treino> insert(@RequestBody Treino resource){
        return ResponseEntity.ok(repository.save(resource));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Treino> findById(@PathVariable Long id){
        return ResponseEntity.ok(repository.findById(id).orElseThrow(() -> new RuntimeException("Id não encontrado")));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Treino> update(@PathVariable Long id,@RequestBody Treino resource){
        Treino treino = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Id não encontrado"));
        treino.setId(id);
        treino.setTipo(resource.getTipo());
        treino.setExercicios(resource.getExercicios());
        return ResponseEntity.ok(repository.save(treino));
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id){
        repository.deleteById(id);
    }

}
