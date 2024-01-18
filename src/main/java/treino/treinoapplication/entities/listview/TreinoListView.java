package treino.treinoapplication.entities.listview;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.View;
import treino.treinoapplication.entities.Cliente;

@Entity
@Data

@View(query="""
        select
            t.id as id,
            c.nome as nome,
            t.tipo as tipo,
            listagg(e.descricao, ',') as exercicios
        from treino_exercicios te
        inner join exercicio e
        on te.exercicios_id = e.id
        inner join treino t
        on te.treino_id = t.id
        inner join cliente c
        on t.cliente_id = c.id
        group by t.id, c.nome, t.tipo
        """)
public class TreinoListView {
    @Id
    private Long id;
    private String nome;
    private String tipo;
    private String exercicios;
}
