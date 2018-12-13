package com.abcenterprise.ppmtool.services;

import com.abcenterprise.ppmtool.domain.ProjectTask;

public interface BacklogService {

	void addProjectTask(String projectIdentifier, ProjectTask projectask);

	Iterable<ProjectTask> findBacklogById(String projectIdentifier);

	ProjectTask findByProjectSequence(String backlog_id, String projectSequence);

	ProjectTask updateProjectTaskByProjectSequence(ProjectTask projectTask, String backlog_id, String projectSequence);

	void deleteProjectTaskByProjectSequence(String backlog_id, String projectSequence);

}
