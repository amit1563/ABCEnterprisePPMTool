package com.abcenterprise.ppmtool.daoservice;

import com.abcenterprise.ppmtool.domain.ProjectTask;
import com.abcenterprise.ppmtool.exception.BacklogNotFoundException;
import com.abcenterprise.ppmtool.exception.ProjectNotFoundException;
import com.abcenterprise.ppmtool.exception.ProjectTaskNotFoundException;

public interface BacklogDaoService {

	public void addProjectTask(String projectIdentifier, ProjectTask projectask) throws ProjectNotFoundException;

	Iterable<ProjectTask> findBacklogById(String projectIdentifier) throws ProjectNotFoundException;

	ProjectTask findByProjectSequence(String backlog_id, String projectSequence)
			throws BacklogNotFoundException, ProjectTaskNotFoundException;

	ProjectTask updateProjectTaskByProjectSequence(ProjectTask projectTask, String backlog_id, String projectSequence)
			throws ProjectTaskNotFoundException;

	void deleteProjectTaskByProjectSequence(String backlog_id, String projectSequence)
			throws ProjectTaskNotFoundException;

}
