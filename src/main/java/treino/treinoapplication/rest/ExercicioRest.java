package treino.treinoapplication.rest;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import treino.treinoapplication.entities.Exercicio;
import treino.treinoapplication.entities.listview.ExercicioListView;
import treino.treinoapplication.repositories.ExercicioRepository;
import treino.treinoapplication.repositories.listview.ExercicioListViewRepository;
import treino.treinoapplication.repositories.specification.ExercicioSpecification;

import java.util.List;

@RestController
@RequestMapping("/api/exercicio")
@AllArgsConstructor
public class ExercicioRest {

    private ExercicioListViewRepository listViewRepository;

    private ExercicioRepository repository;

    @GetMapping
    public ResponseEntity<List<ExercicioListView>> findAll(){
        return ResponseEntity.ok(listViewRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Exercicio> insert(@RequestBody Exercicio resource){
        return ResponseEntity.ok(repository.save(resource));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exercicio> findById(@PathVariable Long id){
        return ResponseEntity.ok(repository.findById(id).orElseThrow(() -> new RuntimeException("Id não encontrado")));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exercicio> update(@PathVariable Long id,@RequestBody Exercicio resource){
        resource.setId(id);
        return ResponseEntity.ok(repository.save(resource));
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id){
        repository.deleteById(id);
    }

    @GetMapping("/tipo/{musculo}")
    public ResponseEntity<List<Exercicio>> findByTipo(@PathVariable String musculo){
        return ResponseEntity.ok(repository.findAll(ExercicioSpecification.findExercicioByMusculo(musculo)));
    }


}
