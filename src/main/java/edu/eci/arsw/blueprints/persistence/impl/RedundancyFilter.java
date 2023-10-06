package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintFilter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

//@Service
public class RedundancyFilter implements BlueprintFilter {

    @Override
    public Blueprint filter(Blueprint blueprint) {

        List<Point> points = blueprint.getPoints();
        List<Point> filteredPoints = new ArrayList<>();
        filteredPoints.add(points.get(0));

        for (int i = 1; i < points.size(); i ++) {
            if(points.get(i-1).getX() != points.get(i).getX() &&
                    points.get(i-1).getY() != points.get(i).getY()){
                filteredPoints.add(points.get(i));
            }
        }

        Point[] newPoints = toArrayPoints(filteredPoints);
        Blueprint filteredBlueprint = new Blueprint(blueprint.getAuthor(), blueprint.getName(), newPoints);

        return filteredBlueprint;
    }
}
