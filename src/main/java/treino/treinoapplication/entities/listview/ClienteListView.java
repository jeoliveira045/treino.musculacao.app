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
            c.cpf,
            listagg(t.tipo, ',') as treinos
        from TREINO t
        inner join CLIENTE_TREINOS ct
        on ct.treinos_id = t.id
        inner join CLIENTE c
        on ct.cliente_id = c.id
        group by c.id, c.nome, c.cpf
        """)
public class ClienteListView {
    @Id
    private Long id;
    private String nome;
    private String cpf;
}
