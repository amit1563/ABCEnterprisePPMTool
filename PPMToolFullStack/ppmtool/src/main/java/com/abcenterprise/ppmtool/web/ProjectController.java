package com.abcenterprise.ppmtool.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abcenterprise.ppmtool.domain.Project;
import com.abcenterprise.ppmtool.services.ProjectService;
import com.abcenterprise.ppmtool.validationerrorhandler.FieldErrorHandler;

@RestController
@CrossOrigin
@RequestMapping("/api/project")
public class ProjectController {
	@Autowired
	ProjectService projectService;
	@Autowired
	FieldErrorHandler fieldErrorHandler;

	@PostMapping("/create")
	public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result) {
		ResponseEntity<?> errorMap = fieldErrorHandler.mapValidationError(result);
		if (errorMap != null) {
			return errorMap;
		}
		projectService.saveOrUpdateProject(project);
		return new ResponseEntity<Project>(project, HttpStatus.CREATED);
	}

	@GetMapping("/{projectId}")
	public ResponseEntity<?> getProjectByProjectIdentifier(@PathVariable String projectId) {
		Project project = projectService.findByProjectIdentifier(projectId.toUpperCase());
		if (project != null)
			return new ResponseEntity<Project>(project, HttpStatus.ACCEPTED);
		return null;
	}

	@GetMapping("/all")
	public ResponseEntity<?> getAllProjects() {
		return new ResponseEntity<Iterable<Project>>(projectService.findAllProjects(), HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/delete/{projectIdentifierName}")
	public ResponseEntity<?> deleteProject(@PathVariable String projectIdentifierName) {
		projectService.deleteProject(projectIdentifierName.toUpperCase());
		return new ResponseEntity<String>("Project deleted successfully!", HttpStatus.OK);
	}

	@PutMapping("/update")
	public ResponseEntity<?> updateProject(@Valid @RequestBody Project project, BindingResult result) {
		ResponseEntity<?> errorMap = fieldErrorHandler.mapValidationError(result);
		if (errorMap != null) {
			return errorMap;
		}
		if (projectService.updateProject(project))
			return new ResponseEntity<String>("Project updated successfully", HttpStatus.OK);
		return null;
	}
}
