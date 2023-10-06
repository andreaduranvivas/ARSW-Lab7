/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.controllers;

import java.util.LinkedHashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.services.BlueprintsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Andrea Durán
 * @author Camilo Fajardo
 */
@RestController
@RequestMapping(value = "/blueprints")
public class BlueprintAPIController {

    @Autowired
    BlueprintsServices bps;

    @GetMapping(produces = "application/json")
    public ResponseEntity<?> manejadorGetRecursoBlueprints() {
        try {
            return new ResponseEntity<>(bps.getAllBlueprints(), HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(produces = "application/json", path="/{author}")
    public ResponseEntity<?> manejadorGetRecursoBlueprintsByAuthor(@PathVariable("author") String author) {
        try {
            return new ResponseEntity<>(bps.getBlueprintsByAuthor(author), HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(produces = "application/json", path="/{author}/{bpname}")
    public ResponseEntity<?> manejadorGetRecursoBlueprintsByAuthor(@PathVariable("author") String author, @PathVariable("bpname") String bpname) {
        try {
            return new ResponseEntity<>(bps.getBlueprint(author, bpname), HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> manejadorPostRecursoBlueprints(@RequestBody Blueprint bluePrint) {
        try {
            bps.addNewBlueprint(bluePrint);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (BlueprintPersistenceException e) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    @PutMapping(path="/{author}/{name}")
    public ResponseEntity<?> manejadorPutRecursoBlueprints(@RequestBody Blueprint bluePrint, @PathVariable("author") String author, @PathVariable("name") String name) {
        try {
            bps.updateBluePrint(bluePrint, author, name);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (BlueprintNotFoundException e) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
}