package treino.treinoapplication.repositories.listview;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import treino.treinoapplication.entities.listview.TreinoListView;

@Repository
public interface TreinoListViewRepository extends JpaRepository<TreinoListView, Long> {

}
