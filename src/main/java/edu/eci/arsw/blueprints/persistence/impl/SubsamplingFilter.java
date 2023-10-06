package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintFilter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubsamplingFilter implements BlueprintFilter {

    @Override
    public Blueprint filter(Blueprint blueprint) {
        List<Point> points = blueprint.getPoints();
        List<Point> filteredPoints = new ArrayList<>();

        for (int i = 0; i < points.size(); i += 2) {
            filteredPoints.add(points.get(i));
        }

        Point[] newPoints = toArrayPoints(filteredPoints);
        Blueprint filteredBlueprint = new Blueprint(blueprint.getAuthor(), blueprint.getName(), newPoints);

        return filteredBlueprint;
    }
}
