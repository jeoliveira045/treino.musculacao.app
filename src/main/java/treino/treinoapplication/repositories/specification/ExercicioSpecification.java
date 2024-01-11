package treino.treinoapplication.repositories.specification;

import org.springframework.data.jpa.domain.Specification;
import treino.treinoapplication.entities.Exercicio;

public class ExercicioSpecification {
    public static Specification<Exercicio> findExercicioByMusculo(String musculo){
        return (root, cq, cb) -> {
            return cb.equal(root.get("musculo"), musculo);
        };
    }
}
