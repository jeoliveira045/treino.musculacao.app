package treino.treinoapplication.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import treino.treinoapplication.entities.Exercicio;

@Repository
public interface ExercicioRepository extends JpaRepository<Exercicio, Long>, JpaSpecificationExecutor<Exercicio> {
}
