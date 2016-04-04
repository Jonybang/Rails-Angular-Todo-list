class Api::ProjectsController < ApiController
  permit_attrs :name, :description
end
