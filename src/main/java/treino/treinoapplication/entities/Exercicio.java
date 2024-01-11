package treino.treinoapplication.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "EXERCICIO")
public class Exercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "EXERCICIO_SEQ")
    private Long id;

    private String musculo;

    private String descricao;


}
