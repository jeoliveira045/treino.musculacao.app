package treino.treinoapplication.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import treino.treinoapplication.entities.ExercicioQuantidade;

@Repository
public interface ExercicioQuantidadeRepository extends JpaRepository<ExercicioQuantidade, Long> {
}
