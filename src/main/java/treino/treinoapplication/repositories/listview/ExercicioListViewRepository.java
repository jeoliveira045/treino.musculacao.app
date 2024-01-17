package treino.treinoapplication.repositories.listview;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import treino.treinoapplication.entities.listview.ExercicioListView;

@Repository
public interface ExercicioListViewRepository extends JpaRepository<ExercicioListView, Long> {
}
