package treino.treinoapplication.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "TREINO")
public class Treino {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TREINO_SEQ")
    private Long id;

    private String tipo;

    @ManyToOne
    private Cliente cliente;

    @ManyToMany
    private List<Exercicio> exercicios;




}
