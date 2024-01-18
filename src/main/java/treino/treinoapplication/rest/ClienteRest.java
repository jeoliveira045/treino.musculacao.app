package treino.treinoapplication.rest;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import treino.treinoapplication.entities.Cliente;
import treino.treinoapplication.entities.Exercicio;
import treino.treinoapplication.entities.listview.ClienteListView;
import treino.treinoapplication.repositories.ClienteRepository;
import treino.treinoapplication.repositories.listview.ClienteListViewRepository;

import java.util.List;

@RestController
@RequestMapping("/cliente")
@CrossOrigin("http://localhost:4200")
@AllArgsConstructor
public class ClienteRest {
    private ClienteRepository repository;

    private ClienteListViewRepository listViewRepository;

    @GetMapping
    public ResponseEntity<List<ClienteListView>> findAll(){
        return ResponseEntity.ok(listViewRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Cliente> insert(@RequestBody Cliente resource){
        return ResponseEntity.ok(repository.save(resource));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> findById(@PathVariable Long id){
        return ResponseEntity.ok(repository.findById(id).orElseThrow(() -> new RuntimeException("Id não encontrado")));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> update(@PathVariable Long id,@RequestBody Cliente resource){
        Cliente cliente = repository.findById(id).orElseThrow();
        cliente.setId(id);
        cliente.setNome(resource.getNome());
        return ResponseEntity.ok(repository.save(cliente));
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id){
        repository.deleteById(id);
    }
}
