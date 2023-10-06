package edu.eci.arsw.blueprints.persistence;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public interface BlueprintFilter {
    default Set<Blueprint> filterSet(Set<Blueprint> blueprints){
        Set<Blueprint> filteredBps = new HashSet<>();
        for(Blueprint bp : blueprints){
            filteredBps.add(filter(bp));
        }
        return filteredBps;
    }
    Blueprint filter(Blueprint blueprint);

    default Point[] toArrayPoints(List<Point>  filteredPoints){
        Point[] newPoints = new Point[filteredPoints.size()];
        newPoints = filteredPoints.toArray(newPoints);

        return newPoints;
    }
}
