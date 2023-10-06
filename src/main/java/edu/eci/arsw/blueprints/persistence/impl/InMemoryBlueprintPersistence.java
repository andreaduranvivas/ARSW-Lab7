/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @author hcadavid
 * @author Andrea Durán
 * @author Camilo Fajardo
 */
@Service
public class InMemoryBlueprintPersistence implements BlueprintsPersistence{

    private final Map<Tuple<String,String>,Blueprint> blueprints=new HashMap<>();

    public InMemoryBlueprintPersistence() {
        //load stub data
        Point[] pts=new Point[]{new Point(140, 140),new Point(115, 115)};
        Blueprint bp=new Blueprint("_authorname_", "_bpname_",pts);

        Point[] pts1=new Point[]{new Point(345, 259),new Point(166, 100)};
        Blueprint bp1=new Blueprint("andrea", "thepaint",pts1);

        Point[] pts2=new Point[]{new Point(445, 159),new Point(166, 300)};
        Blueprint bp2=new Blueprint("andrea", "points",pts2);

        Point[] pts3=new Point[]{new Point(10, 390),new Point(10, 200),
                new Point(200, 10), new Point(390, 200), new Point(10, 200)
                , new Point(390, 390), new Point(10, 390), new Point(390, 200)
                , new Point(390, 390)};
        Blueprint bp3=new Blueprint("camilo", "House",pts3);

        Point[] pts4=new Point[]{new Point(321, 123),new Point(496, 200)};
        Blueprint bp4=new Blueprint("juan", "person",pts4);



        blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        blueprints.put(new Tuple<>(bp1.getAuthor(),bp1.getName()), bp1);
        blueprints.put(new Tuple<>(bp2.getAuthor(),bp2.getName()), bp2);
        blueprints.put(new Tuple<>(bp3.getAuthor(),bp3.getName()), bp3);
        blueprints.put(new Tuple<>(bp4.getAuthor(),bp4.getName()), bp4);

    }    
    
    @Override
    public synchronized void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        if (blueprints.containsKey(new Tuple<>(bp.getAuthor(),bp.getName()))){
            throw new BlueprintPersistenceException("The given blueprint already exists: "+bp);
        }
        else{
            blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        }        
    }

    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
        Blueprint bp = blueprints.get(new Tuple<>(author, bprintname));
        if (bp == null) {
            throw new BlueprintNotFoundException("The Blueprint was not found: " + bprintname);
        }
        return bp;
    }

    @Override
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException {
        Set<Blueprint> foundBps = new HashSet<>();

        blueprints.forEach((key, value) -> {
            if(value.getAuthor().equals(author)){
                foundBps.add(value);
            }
        });

        if (foundBps.isEmpty()) {
            throw new BlueprintNotFoundException("No blueprints found for author: " + author);
        }
        return foundBps;
    }

    @Override
    public Set<Blueprint> getAllBlueprints() throws BlueprintNotFoundException{
        Set<Blueprint> allBp = new HashSet<>(blueprints.values());

        if (allBp.isEmpty()){
            throw new BlueprintNotFoundException("No blueprints found");
        }

        return allBp;
    }


    public synchronized void updateBluePrint(Blueprint bluePrint, String author, String name) throws BlueprintNotFoundException {
        Blueprint bp = getBlueprint(author, name);
        if (bp != null){
            bp.setPoints(bluePrint.getPoints());
        }else {
            throw new BlueprintNotFoundException("Blueprint doesn't exist");
        }
    }


}
