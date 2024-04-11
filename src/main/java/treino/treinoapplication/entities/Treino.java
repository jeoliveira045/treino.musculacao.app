package treino.treinoapplication.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
public class Treino {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TREINO_SEQ")
    private Long id;


    private String nomeDoTreino;

    @ManyToMany
    private Set<Exercicio> exercicio;
}
