class Task < ActiveRecord::Base
  default_scope { order('"tasks"."index" ASC') }
  belongs_to :project
end
