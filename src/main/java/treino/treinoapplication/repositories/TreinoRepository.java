package treino.treinoapplication.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import treino.treinoapplication.entities.Treino;

@Repository
public interface TreinoRepository extends JpaRepository<Treino, Long>, JpaSpecificationExecutor<Treino> {
}
