package com.abcenterprise.ppmtool.daoservice;

import org.springframework.stereotype.Service;

import com.abcenterprise.ppmtool.domain.Project;
import com.abcenterprise.ppmtool.exception.ProjectNotFoundException;
@Service
public interface ProjectDaoService {
	
	boolean findProjectByProjectName(String userName) throws ProjectNotFoundException;
	Project findProjectByProjectId(String id) throws ProjectNotFoundException;
	
	void save (Project project);
	boolean findProjectByProjectIdentifierName(String projectIdentifier) throws ProjectNotFoundException;
	
	Iterable<?> findAll();
	
	void deleteProjectByProjectIdentifierName(String projectIdentifier) throws ProjectNotFoundException;
	
	boolean updateProject(Project project);

	
	
}
