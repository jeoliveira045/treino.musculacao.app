package treino.treinoapplication.entities.listview;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.View;

@Entity
@Data
@View(query="""
        select
            c.id,
            c.nome,
            c.cpf
        from CLIENTE c
        """)
public class ClienteListView {
    @Id
    private Long id;
    private String nome;
    private String cpf;
}
