package com.abcenterprise.ppmtool.services;

import org.springframework.stereotype.Service;

import com.abcenterprise.ppmtool.domain.Project;
import com.abcenterprise.ppmtool.exception.ProjectNotFoundException;

@Service
public interface ProjectService {

	public void saveOrUpdateProject(Project project);

	public Project findByProjectIdentifier(String projectIdentifier) throws ProjectNotFoundException;

	public Iterable findAllProjects();

	public void deleteProject(String projectIdentifierName);

	public boolean updateProject(Project project);

}
