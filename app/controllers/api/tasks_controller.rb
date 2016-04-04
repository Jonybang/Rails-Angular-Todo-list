class Api::TasksController < ApiController
  permit_attrs :name, :description, :is_complete, :project_id, :index
end
