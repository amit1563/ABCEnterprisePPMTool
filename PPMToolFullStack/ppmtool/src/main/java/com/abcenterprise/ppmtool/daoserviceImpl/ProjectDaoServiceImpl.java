package com.abcenterprise.ppmtool.daoserviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.abcenterprise.ppmtool.daoservice.ProjectDaoService;
import com.abcenterprise.ppmtool.domain.Backlog;
import com.abcenterprise.ppmtool.domain.Project;
import com.abcenterprise.ppmtool.exception.ProjectNotFoundException;
import com.abcenterprise.ppmtool.repositories.ProjectRepository;

@Component
public class ProjectDaoServiceImpl implements ProjectDaoService {

	@Autowired
	ProjectRepository projectRepo;

	@Override
	public boolean findProjectByProjectName(String projectName) throws ProjectNotFoundException {

		if (projectRepo.findByProjectName(projectName) == null)
			return false;
		return true;
	}

	@Override
	public boolean findProjectByProjectIdentifierName(String projectIdentifierName) {
		if (projectRepo.findByProjectByIdentifierName(projectIdentifierName) == null)
			return false;
		return true;
	}

	@Override
	public Project findProjectByProjectId(String id) {
		Project project = projectRepo.findByProjectByIdentifierName(id);
		if (project != null)
			return project;
		return project;
	}

	@Override
	public void save(Project project) {
		boolean projectExist = findProjectByProjectIdentifierName(project.getProjectIdentifier().toUpperCase());
		if (projectExist) {
			throw new RuntimeException();
		} else {
			Backlog backlog = new Backlog();
			project.setBacklog(backlog);
			backlog.setProject(project);
			backlog.setProjectIdentifier(project.getProjectIdentifier());
			projectRepo.save(project);
		}
	}

	@Override
	public Iterable<?> findAll() {
		return projectRepo.findAll();
	}

	@Override
	public void deleteProjectByProjectIdentifierName(String projectIdentifier) throws ProjectNotFoundException {
		boolean flag = projectRepo.findByProjectByIdentifierName(projectIdentifier) != null;
		if (!flag) {
			throw new ProjectNotFoundException("Project with given identifier name not exist.");
		}
		projectRepo.delete(projectRepo.findByProjectByIdentifierName(projectIdentifier));
	}

	@Override
	public boolean updateProject(Project project) {
		Project projectTemp = projectRepo.findByProjectByIdentifierName(project.getProjectIdentifier().toUpperCase());
		boolean flag = projectTemp != null;
		if (!flag) {
			throw new ProjectNotFoundException("Can't Update : Project with given identifier name : "
					+ project.getProjectIdentifier() + " not exist.");
		}
		project.setId(projectTemp.getId());		
		projectRepo.save(project);
		return true;
	}
}
