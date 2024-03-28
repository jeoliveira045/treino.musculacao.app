package treino.treinoapplication.rest;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import treino.treinoapplication.entities.ExercicioQuantidade;
import treino.treinoapplication.repositories.ExercicioQuantidadeRepository;

import java.util.List;

@RestController
@RequestMapping("/api/exercicio-quantidade")
@AllArgsConstructor
public class ExercicioQuantidadeRest {
    private ExercicioQuantidadeRepository repository;


    @GetMapping
    public ResponseEntity<List<ExercicioQuantidade>> findAll(){
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<ExercicioQuantidade> insert(@RequestBody ExercicioQuantidade resource){
        return ResponseEntity.ok(repository.save(resource));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExercicioQuantidade> findById(@PathVariable Long id){
        return ResponseEntity.ok(repository.findById(id).orElseThrow(() -> new RuntimeException("Id não encontrado")));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExercicioQuantidade> update(@PathVariable Long id,@RequestBody ExercicioQuantidade resource){
        return ResponseEntity.ok(repository.save(resource));
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id){
        repository.deleteById(id);
    }
}
