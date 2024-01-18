package treino.treinoapplication.entities.listview;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.View;

@Entity
@Data
@View(query = """
        SELECT 
            id,
            descricao,
            musculo
        from 
            EXERCICIO
        """)
public class ExercicioListView {
    @Id
    private Long id;
    private String descricao;
    private String musculo;
}
