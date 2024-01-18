package treino.treinoapplication.repositories.listview;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import treino.treinoapplication.entities.listview.ClienteListView;

@Repository
public interface ClienteListViewRepository extends JpaRepository<ClienteListView, Long> {
}
