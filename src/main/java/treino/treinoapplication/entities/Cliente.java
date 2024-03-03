package treino.treinoapplication.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "CLIENTE")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CLIENTE_SEQ")
    private Long id;

    private String nome;

    private Integer idade;

    private BigDecimal pesoAtual;

    private BigDecimal pesoDesejado;

    private Double altura;

    @ManyToMany
    @JoinTable(name = "CLIENTE_EXERCICIO",
            joinColumns = @JoinColumn(name = "cliente_id"),
            inverseJoinColumns = @JoinColumn(name = "exercicio_id"))
    private Set<Exercicio> exercicios;
}
