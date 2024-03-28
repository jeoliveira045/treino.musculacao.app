package treino.treinoapplication.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "EXERCICIO_QUANTIDADE")
@Data
public class ExercicioQuantidade{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String quantidade;

    private String series;

}
