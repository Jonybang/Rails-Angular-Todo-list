object @_resource

extends "api/base"

child :tasks, :root => "tasks", :object_root => false do
  extends "api/tasks/base"
end